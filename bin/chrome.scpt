on run port
  set full_path to "http://localhost:" & port
  if application "Google Chrome" is not running then
    tell application "Google Chrome"
      activate
      delay 0.2
    end tell
  end if
  set findtab to false
  tell application "Google Chrome"
    activate
    set window_list to every window
    repeat with the_window in window_list
      set tab_list to every tab in the_window
      set num to 0
      repeat with the_tab in tab_list
        set num to num + 1
        set the_url to the URL of the_tab
        if the_url starts with full_path then
          set active tab index of the_window to num
          set findtab to true
          tell the_tab
            execute javascript "location.href='" & full_path & "'"
          end tell
        end if
      end repeat
    end repeat
    if not findtab then
      open location full_path
      tell application "System Events"
        key code {55, 58, 34}
      end tell
    end if
  end tell
end run
