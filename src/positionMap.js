module.exports = (position) => {
    switch (position) {
        case 'QB':
            return {
                slotCategoryId: 0,
                defaultPositionId: 1
            }
        case 'RB': {
            return {
                slotCategoryId: 2,
                defaultPositionId: 2,
                flex: 23
            }
        }
        case 'WR': {
            return {
                slotCategoryId: 4,
                defaultPositionId: 3,
                flex: 23
                
            }
        }
        case 'TE': {
            return {
                slotCategoryId: 6,
                defaultPositionId: 4,
                flex: 23
                
            }
        }
        case 'D': {
            return {
                slotCategoryId: 16,
                defaultPositionId: 16
                
            }
        }
        case 'K': {
            return {
                slotCategoryId: 17,
                defaultPositionId: 5
            }
        }
        // case 'FLEX': {
        //     return {
        //         slotCategoryId: 23,

        //     }
        // }
    
        default:
            break;
    }
    
}