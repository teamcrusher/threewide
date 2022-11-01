# Tetris Flow Diagram

---

```mermaid
  graph TD
    User[User]-- "Key down event" --> CheckProcessed{{Has key event been processed}}
    CheckProcessed -- "No" --> AddEvent[Add event to active events]
    AddEvent --> Handle["Handle event"]

    User -- "Key up event" --> RemoveEvent[Remove event from active events]
    RemoveEvent -- "Move piece left event" --> CheckDasRightEnabled{{Is there a das event trigger from a right move?}}
    CheckDasRightEnabled -- "Yes" --> DisableDas[Disable DAS and remove das timeout]
    RemoveEvent -- "Move piece left event" --> CheckDasLeftEnabled{{Is there a das event trigger from a left move?}}
    CheckDasLeftEnabled -- "Yes" --> DisableDas

    Handle -- "Move piece left event" --> CheckMove{{Does the moved piece fit on the board?}}
    Handle -- "Move piece right event" --> CheckMove{{Does the moved piece fit on the board?}}
    CheckMove -- "Yes" --> MovePiece[Move Piece]
    MovePiece --> TriggerDas[Wait for the DAS time]
    TriggerDas --> CheckCancel{{Has das been cancelled?}}
    CheckCancel -- "No" --> EnableDas[Enable DAS]
    EnableDas --> DasPiece[Move piece to the end of the board] 
    MovePiece --> CheckSoftDrop{{Is user soft dropping?}}
    CheckSoftDrop -- "Yes" --> SoftDropDown[Move piece to the bottom of the board]

    Handle -- "Rotate piece 90 degrees event" --> CheckRotate{{Does rotated piece fit on the board?}}
    Handle -- "Rotate piece 180 degrees event" --> CheckRotate{{Does rotated piece fit on the board?}}
    Handle -- "Rotate piece 270 degrees event" --> CheckRotate{{Does rotated piece fit on the board?}}
    CheckRotate -- "Yes" --> RotatePiece[Rotate piece]
    RotatePiece --> CheckSoftDrop{{Is user soft dropping?}}
    RotatePiece --> CheckDas{{Is DAS enabled?}}
    CheckDas -- "Yes" --> DasPiece
    CheckRotate -- "No" --> CheckKick{{Is there an SRS kick?}}
    CheckKick -- "Yes" --> CheckWall{{Does a wall for the kick exist?}}
    CheckWall -- "Yes" --> CheckMoveKick{{Does the kicked piece fit in the board?}}
    CheckWall -- "No" --> NextKick
    CheckMoveKick -- "Yes" --> KickPieceDown[Kick the piece down]
    CheckMoveKick -- "No" --> NextKick
    NextKick[Go to the next kick] --> CheckKick

    Handle -- "Place piece event" --> PlacePiece[Place Piece]
    PlacePiece --> SetCurrentPieceToNext[Set current piece to next piece in the queue] 
    SetCurrentPieceToNext --> PopPiece[Pop piece out of queue]
    PopPiece --> CheckQueueLength{{Is queue less than 2 bags?}}
    CheckQueueLength -- "Yes" --> AddBag[Add bag to queue]
    PopPiece --> CheckDas

    Handle -- "Hold piece event" --> HoldPiece[Set hold piece to current piece]
    HoldPiece --> CheckHold{{Was the hold piece empty?}}
    CheckHold -- "No" --> SetCurrentPieceToHold[Set current piece to hold piece]
    SetCurrentPieceToHold --> CheckDas
    SetCurrentPieceToHold --> CheckSoftDrop
    CheckHold -- "Yes" --> PopPiece

    Handle -- "Soft drop event" --> EnableSoftDrop[Enable soft drop]
    EnableSoftDrop --> SoftDropPiece[Move piece to the bottom of the board]
    ```