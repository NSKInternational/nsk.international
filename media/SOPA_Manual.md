/////////////////////////
// SOPA PROGRAM MANUAL //
/////////////////////////

# WINDOWS ONLY - If the program is not launching on windows, you may be missing WebView2 from Microsoft.

### Footer

   Each column in the footer has a stat display above its input field showing two values:

   **Date Column**
      - Left: Total days spanned in the dataset
      - Right: Current streak of consecutive days with complete data
      - Tooltip: Shows the same values as the display in full without overflow

   **Time/Number Columns**
      - Left: Cumulative total for the column
      - Right: Anticipated total based on wanted value x total days in chart
      - Tooltip: Shows the same values as the display in full without overflow

### Data Cell Tooltips

   **Time/Number Data Cells**
      - Shows two values:
      - Cumulative total up to that row's date
      - Difference from anticipated value (based on wanted value per day) postiive or negative
      - Only appears in normal mode, outside of edit mode
      - Example for time: "+02:30    -01:15" (2.5 hours total, 1.25 hours behind)
      - Example for number: "+000150    -000050" (150 total, 50 behind)

   **Percentage Cells**
      - Shows the absolute difference from the wanted value
      - Format: "+HH:MM" time "+000000" number
      - Example: "+01:30" (1.5 hours ahead)

   **Date Cells**
      - Shows all events for that date
      - Lists events in chronological order
      - Format: "1. Event One, 2. Event Two"

### Month Summary Stats

   **Logged Days Column**
      - Left: Total days in the month
      - Right: Percentage of days logged vs. total days

   **Data Columns**
      - Left: Anticipated total for the month wanted value x days in month
      - Right: Percentage difference from anticipated value

## Inputting Data / Correct Formatting

   **Date Input (MM/DD)**
      - Format: Two digits for month, two digits for day
      - Examples: "01/15"  "12/31"
      - Invalid inputs will cause the field to flash red

   **Time Input (HH:MM)**
      - Format: Hours:Minutes
      - Optional negative sign for negative values
      - Examples: "02:30"  "-01:59"
      - Empty Date will place data into the last row in the table
      - Invalid inputs will cause the field to flash red

   **Number Input**
      - Format: Up to 6 digits
      - Optional negative sign for negative values
      - Examples: "000150"  "-999999"
      - Empty Date will place data into the last row in the table
      - Invalid inputs will cause the field to flash red

### Edit Mode Inputs

   **Column Color Input**
      - Format: (RRGGBB)
      - Examples: "990000" (RED), "009900" (GREEN)
      - Invalid inputs will cause the field to flash red

   **Wanted Value Input**
      - The value you want to have in a certain column, each day
      - Invalid inputs will cause the field to flash red

   **Column Name Input**
      - Any text
      - Empty input defaults to "Col #"