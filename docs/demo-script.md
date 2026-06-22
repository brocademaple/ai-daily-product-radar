# Demo Script

## 1. Open the Radar Board

Start backend and frontend, then open the app.

Expected result: the first screen shows a Radar board with several project
cards grouped by status.

## 2. Review the Board

Scan the columns:

- Top Picks
- Watchlist
- Skip / Low Signal
- Published

Expected result: the board gives a quick global view without reading a long
report first.

## 3. Open a Project Card

Select one Top Pick.

Expected result: the detail panel explains what the project does, who it is
for, why it is AI-native, whether it appears runnable, and what action is
recommended.

## 4. Preview Publishing Outputs

Open the publishing panel.

Expected result: Yuque Markdown and Feishu Base sync content can be previewed
before any external write happens.

## 5. Publish to Yuque

Trigger Yuque publishing.

Expected result: a daily report is created under `向26出发 / AI Daily Product
Radar`, and the local publish status changes to success with a document
identifier or link.

## 6. Sync to Feishu Base

Trigger Feishu Base sync.

Expected result: project cards are written as Base records and can be viewed as
a board in Feishu.

## 7. Verify Status

Return to the Radar board.

Expected result: channel-level status shows whether local data, Yuque, and
Feishu succeeded or failed, with retry guidance for failures.
