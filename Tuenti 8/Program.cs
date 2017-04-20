using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Prob8
{
    enum Direction
    {
        Right = 0,
        Up = 1,
        Left = 2,
        Down = 3,
        NumDirections = 4
    }

    class Position
    {
        public Position(int x, int y)
        {
            X = x;
            Y = y;
        }

        public int X { get; set; }
        public int Y { get; set; }
    }

    class MazeSolver
    {
        private TcpClient _client;
        private NetworkStream _stream;
        private CellType[,] _labyrinth;
        private Direction _currentDirection;

        private string _result = "";
        private bool _hasCharacter = false;
        private string[] _rawData;
        private char[,] map = new char[180, 180];
        private StreamWriter _outputStream;

        private readonly byte[] COMMANDS = new byte[]
        {
            Convert.ToByte('r'),
            Convert.ToByte('u'),
            Convert.ToByte('l'),
            Convert.ToByte('d')
        };

        private readonly Position[] MOVESTEPS = new Position[]
        {
            new Position( 1, 0 ),
            new Position( 0, -1 ),
            new Position( -1, 0 ),
            new Position( 0, 1 )
        };
        private int X = 90;
        private int Y = 90;
        private enum CellType
        {
            CurrentPosition,
            Wall,
            Space,
            Character
        }

        public void Solve()
        {
            InitialMap();
            _client = new TcpClient();
            _client.Connect(new System.Net.IPEndPoint(IPAddress.Parse("52.49.91.111"), 1986));
            _stream = _client.GetStream();

            _outputStream = new StreamWriter("labyrinth.txt");

            // let's play
            bool canMoveNext = true;

            _currentDirection = Direction.Up; // default direction

            var move = new int[2, 1];
            move[0, 0] = 1;
            move[1, 0] = 0;
            _labyrinth = GetLabyrinth(move);

            while (canMoveNext)
            {
                // update maze
                try
                {
                    byte cmd;

                    {
                        _currentDirection = GetNextDirection();
                        cmd = COMMANDS[(int)_currentDirection];
                    }

                    _stream.Write(new byte[] { cmd, 0xa }, 0, 2);

                    
                    if (_currentDirection == Direction.Up)
                    {
                        move[0, 0] = 1;
                        move[1, 0] = 0;
                    }
                    if (_currentDirection == Direction.Down)
                    {
                        move[0, 0] = -1;
                        move[1, 0] = 0;
                    } if (_currentDirection == Direction.Left)
                    {
                        move[0, 0] = 0;
                        move[1, 0] = -1;
                    } if (_currentDirection == Direction.Right)
                    {
                        move[0, 0] = 0;
                        move[1, 0] = 1;
                    }

                    _labyrinth = GetLabyrinth(move);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    canMoveNext = false;
                }
            }
            Map();
            _outputStream.Close();
            _client.Close();
            Console.ReadKey();
        }

        private CellType[,] GetLabyrinth(int[,] move)
        {
            var buffer = new byte[1024];
            var nBytes = _stream.Read(buffer, 0, 1024);
            var data = Encoding.ASCII.GetString(buffer, 0, nBytes);

            return ParseMaze(data, move);
        }

        private CellType[,] ParseMaze(string data, int[,] move)
        {
            var maze = new CellType[7, 7]; //TODO:

            _rawData = data.Split(new string[] { "\n" }, StringSplitOptions.RemoveEmptyEntries);

            if (_rawData.Length != maze.GetLength(0))
                throw new Exception("Can't parse maze: " + data);

            X = X + move[0, 0];
            Y = Y + move[1, 0];
            for (int i = 0; i < maze.GetLength(0); i++)
            {
                for (int j = 0; j < _rawData[i].Length; j++)
                {
                    var cellType = MapCellType(_rawData[i][j]);
                    maze[i, j] = cellType;
                    map[i + X, j + Y] = _rawData[i][j];
                }
            }
            Debug(data);

            return maze;
        }

        private CellType MapCellType(char c)
        {
            switch (c)
            {
                case ' ':
                    return CellType.Space;
                case '#':
                    return CellType.Wall;
                case 'x':
                    return CellType.CurrentPosition;
                default:
                    return CellType.Character;
            }
        }

        private static Direction[] priorityDirections = new Direction[] 
            {
                Direction.Left,
                Direction.Up,
                Direction.Right,
                Direction.Down
            };

        private Direction GetNextDirection()
        {
            var currentPos = GetCurrentPosition();

            //for (int i = 0; i < (int)Direction.NumDirections; i++)
            foreach (var i in priorityDirections)
            {
                var direction = GetDirectionFromCurrentFaceDirection(_currentDirection, (Direction)i);
                var step = MOVESTEPS[(int)direction];

                var cType = _labyrinth[currentPos.Y + step.Y, currentPos.X + step.X];
                if (cType == CellType.Space || cType == CellType.Character) // row-based matrix
                {
                    if (cType == CellType.Character)
                    {
                        _result += _rawData[currentPos.Y + step.Y][currentPos.X + step.X];
                        Console.WriteLine("Result: ", _result);
                    }

                    return direction;
                }
            }

            throw new Exception("i'm stuck here");
        }

        private Direction GetDirectionFromCurrentFaceDirection(Direction currentDirection, Direction relativeDirection)
        {
            return (Direction)
                (((int)currentDirection + (int)relativeDirection - (int)Direction.Up + (int)Direction.NumDirections) %
                    (int)Direction.NumDirections);
        }

        private Position GetCurrentPosition()
        {
            for (int r = 0; r < _labyrinth.GetLength(0); r++)
            {
                for (int c = 0; c < _labyrinth.GetLength(1); c++)
                {
                    if (_labyrinth[r, c] == CellType.CurrentPosition)
                        return new Position(r, c);
                }
            }

            DebugLabyrinth();
            throw new Exception("Can't find current position");
        }

        private void DebugLabyrinth()
        {
            for (int r = 0; r < _labyrinth.GetLength(0); r++)
            {
                for (int c = 0; c < _labyrinth.GetLength(1); c++)
                {
                    Console.Write("{0} ", (int)_labyrinth[r, c]);
                }

                Console.WriteLine();
            }
        }

        private void Debug(string message)
        {
            Console.WriteLine(message);
        }

        private void InitialMap()
        {
            for (int i = 0; i < 180; i++)
            {
                for (int j = 0; j < 180; j++)
                {
                    map[i, j] = ' ';
                }
            }
        }

        private void Map()
        {
            for (int i = 0; i < 180; i++)
            {
                for (int j = 0; j < 180; j++)
                {
                    _outputStream.Write(map[i, j]);
                    if (j == 179)
                        _outputStream.Write("\n");
                }
            }

        }
    }

    class Program
    {
        public static void Main(string[] args)
        {
            var solver = new MazeSolver();
            solver.Solve();

            Console.ReadLine();
        }
    }
}
