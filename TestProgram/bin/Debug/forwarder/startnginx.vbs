Dim cmd
Set WshShell = WScript.CreateObject("WScript.Shell")
cmd="cmd /c startnginx.bat"
ReturnCode = WshShell.Run(cmd, 1, True)