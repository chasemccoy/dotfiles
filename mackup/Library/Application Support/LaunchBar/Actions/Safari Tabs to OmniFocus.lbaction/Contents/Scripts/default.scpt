-- This handler is called when the user runs the action:
on run
	
	
	(* 

======================================

// MAIN PROGRAM 

======================================

*)
	
	--RESET VALUES
	set urlList to {}
	set currentTab to 0
	
	--SET DATE STAMP
	set the dateStamp to ((the current date) as string)
	set noteTitle to "URL List from Safari Tabs on " & the dateStamp
	
	--PROCESS TABS OF FRONTMOST SAFARI WINDOW
	tell application "Safari"
		set successCount to 0
		set safariWindow to the front window
		set tabCount to (count of (tabs of safariWindow))
		
		--GET TAB INFORMATION	
		try
			repeat with t in (tabs of safariWindow)
				set currentTab to currentTab + 1
				
				set tabTitle to (name of t)
				set tabURL to (URL of t)
				
				if currentTab is not equal to tabCount then
					set tabInfo to (tabTitle & return & tabURL & return & return)
				else
					-- don't output double return on last tab
					set tabInfo to (tabTitle & return & tabURL)
				end if
				
				--COPY TAB INFO TO END OF LIST			
				copy tabInfo to the end of urlList
				
				--INCREMENT SUCCESS COUNT
				set successCount to (successCount + 1)
			end repeat
		end try
	end tell
	
	
	--MAKE INBOX ITEM IN OMNIFOCUS
	tell front document of application "OmniFocus"
		make new inbox task with properties {name:(noteTitle), note:urlList as text}
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
		display notification "No Tabs Exported!" with title "Send Safari Tabs to OmniFocus" subtitle "◸ Veritrope.com"
		
	else if Plural_Test is 0 then
		display notification "No Tabs Exported!" with title "Send Safari Tabs to OmniFocus" subtitle "◸ Veritrope.com"
		
	else if Plural_Test is equal to 1 then
		display notification "Successfully Exported " & itemNum & ¬
			" Tab to OmniFocus" with title "Send Safari Tabs to OmniFocus" subtitle "◸ Veritrope.com"
		
	else if Plural_Test is greater than 1 then
		display notification "Successfully Exported " & itemNum & ¬
			" Tabs to OmniFocus" with title "Send Safari Tabs to OmniFocus" subtitle "◸ Veritrope.com"
	end if
	
	set itemNum to "0"
	delay 1
end notification_Center