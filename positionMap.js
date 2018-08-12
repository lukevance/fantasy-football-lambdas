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
                defaultPositionId: 2
            }
        }
    
        default:
            break;
    }
    
}