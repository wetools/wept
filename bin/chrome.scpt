if application "Google Chrome" is not running then
	tell application "Google Chrome"
		activate
    delay 0.2
	end tell
end if
set findtab to false
tell application "Google Chrome"
	set window_list to every window
	repeat with the_window in window_list
		set tab_list to every tab in the_window
		set num to 0
		repeat with the_tab in tab_list
			set num to num + 1
			set the_url to the URL of the_tab
			if the_url starts with "http://localhost:3000" then
				set active tab index of the_window to num
				set findtab to true
				tell the_tab
					reload
				end tell
			end if
		end repeat
	end repeat
	if not findtab then
		open location "http://localhost:3000"
	end if
end tell
