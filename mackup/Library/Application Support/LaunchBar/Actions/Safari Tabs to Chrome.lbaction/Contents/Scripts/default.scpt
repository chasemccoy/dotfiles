-- This handler is called when the user runs the action:
on run
	(*

Veritrope.com

Open Safari Tabs in Chrome

Version 1.0

April 18, 2011



// TERMS OF USE:

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 

To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.



// LIKE THIS SCRIPT?

If this AppleScript is helpful to you, please show your support here: 

http://veritrope.com/support



// SCRIPT INFORMATION AND UPDATE PAGE

http://veritrope.com/code/open-safari-tabs-in-chrome



// REQUIREMENTS

More details on the script information page.



// CHANGELOG

1.0 Initial Release

*)
	
	set list_Tabs to {}
	tell application "Safari"
		set the_Tabs to (tabs of every window)
		repeat with the_Tab in the_Tabs
			set the_Items to (every item of the_Tab)
			repeat with the_Item in the_Items
				copy URL of the_Item to end of list_Tabs
			end repeat
		end repeat
	end tell
	
	tell application "Google Chrome"
		repeat with list_Tab in list_Tabs
			set myTab to make new tab at end of tabs of window 1
			set URL of myTab to list_Tab
		end repeat
	end tell
	
	
	
	
end run

