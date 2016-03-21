-- This handler is called when the user runs the action:
on run
	
	(*

	◸ Veritrope.com

	Safari Tab List to Evernote Exporter

	Version 1.1

	June 15, 2014
	
	// UPDATE NOTICES

		** Follow @Veritrope on Twitter, Facebook, Google Plus, and ADN for Update Notices! **

	

	// SUPPORT VERITROPE!

		If this AppleScript was useful to you, please take a second to show your love here: 

		http://veritrope.com/support
		

	// SCRIPT INFORMATION AND UPDATE PAGE:

		http://veritrope.com/code/export-all-safari-tabs-to-evernote

	

	// TERMS OF USE:

		This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 

		To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

	

	// CHANGELOG:

		1.10    NOTIFICATION CENTER, BETTER COMMENTS

		1.00    INITIAL RELEASE
	

	*)
	
	--RESET VALUES
	set urlList to {}
	set currentTab to 0
	
	--SET DATE STAMP
	set the dateStamp to ((the current date) as string)
	set NoteTitle to "URL List from Safari Tabs on " & the dateStamp
	
	--PROCESS TABS OF FRONTMOST SAFARI WINDOW
	tell application "Safari"
		activate
		set safariWindow to the front window
		set successCount to 0
		set tabCount to (count of (tabs of safariWindow))
		
		repeat with w in safariWindow
			--GET TAB INFORMATION	
			try
				repeat with t in (tabs of w)
					set TabTitle to (name of t)
					set TabURL to (URL of t)
					set TabInfo to ("" & TabTitle & return & TabURL & return & return)
					--COPY TAB INFO TO END OF LIST	
					copy TabInfo to the end of urlList
					
					--INCREMENT SUCCESS COUNT
					set successCount to (successCount + 1)
					
				end repeat
			end try
		end repeat
	end tell
	
	--CONVERT LIST TO TEXT
	set old_delim to AppleScript's text item delimiters
	set AppleScript's text item delimiters to return
	set url_list to urlList as text
	set AppleScript's text item delimiters to old_delim
	
	--MAKE ITEM IN EVERNOTE
	tell application "Evernote"
		set EVNote to (create note with text url_list title NoteTitle)
	end tell
	
	--NOTIFY RESULTS
	my notification_Center(successCount, tabCount)
end run

(* 

======================================

// NOTIFICATION SUBROUTINE

======================================

*)

--NOTIFICATION CENTER
on notification_Center(successCount, itemNum)
	set Plural_Test to (successCount) as number
	
	if Plural_Test is -1 then
		display notification "No Tabs Exported!" with title "Send Safari Tabs to Evernote" subtitle "◸ Veritrope.com"
		
	else if Plural_Test is 0 then
		display notification "No Tabs Exported!" with title "Send Safari Tabs to Evernote" subtitle "◸ Veritrope.com"
		
	else if Plural_Test is equal to 1 then
		display notification "Successfully Exported " & itemNum & ¬
			" Tab to Evernote" with title "Send Safari Tabs to Evernote" subtitle "◸ Veritrope.com"
		
	else if Plural_Test is greater than 1 then
		display notification "Successfully Exported " & itemNum & ¬
			" Tabs to Evernote" with title "Send Safari Tabs to Evernote" subtitle "◸ Veritrope.com"
	end if
	
	set itemNum to "0"
	delay 1
end notification_Center
