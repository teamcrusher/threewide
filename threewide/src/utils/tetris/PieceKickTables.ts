import { PieceType, Rotation } from "../../types/tetris"

let defaultKicktable : {[id: number] : any}  = {
    0 : {
        1 : [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        3 : [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]]
    },
    1 : {
        1 : [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
        3 : [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
    },
    2 : {
        1 : [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        3 : [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]
    },
    3 : {
        1 : [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        3 : [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]]
    }
}

let default180KickTable : {[id: number] : any}= {
    0 : [[0, 0], [0, -1], [1, -1], [-1, -1], [1, 0], [-1, 0]],
    1 : [[0, 0], [1, 0], [1, -2], [1, -1], [0, -2], [0, -1]],
    2 : [[0, 0], [0, 1], [-1, 1], [1, 1], [-1, 0], [1, 0]],
    3 : [[0, 0], [-1, 0], [-1, -2], [-1, -1], [0, -2], [0, -1]]
}

let iKickTable : {[id: number] : any} = {
    0 : {
        1 : [[0, 0], [1, 0], [-2, 0], [-2, 1], [1, -2]],
        3 : [[0, 0], [-1, 0], [2, 0], [2, 1], [-1, -2]]
    },
    1 : {
        1 : [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
        3 : [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, -1]]
    },
    2 : {
        1 : [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
        3 : [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]]
    },
    3 : {
        1 : [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, -1]],
        3 : [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]]
    }
}

function getTableFromPieceAndRotation  (pieceType : PieceType, currentRotation : Rotation, rotation : Rotation) : Array<[number,number]> {
    if (rotation == Rotation.OneEighty) {
        return default180KickTable[currentRotation]
    } else if (pieceType == PieceType.I) {
        return iKickTable[currentRotation][rotation]
    } else {
        return defaultKicktable[currentRotation][rotation]
    }
}

export {getTableFromPieceAndRotation}