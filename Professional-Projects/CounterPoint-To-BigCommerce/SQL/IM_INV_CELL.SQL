
SELECT
IM_INV_CELL.ITEM_NO AS 'CP ITEM_NO',
IM_INV_CELL.DIM_1_UPR + '/' + IM_INV_CELL.DIM_2_UPR + '/' + IM_INV_CELL.DIM_3_UPR AS
'DIMENSIONS',
IM_INV_CELL.QTY_AVAIL AS 'QTY AVAIL'

FROM IM_INV_CELL

WHERE
IM_INV_CELL.QTY_AVAIL > 0 AND
IM_INV_CELL.ITEM_NO NOT LIKE '%SWAP'

-- Exports selected rows from IM_INV_CELL
-- When qty is greater than 0
-- And the item does not begin with swap (excludes swap items)
