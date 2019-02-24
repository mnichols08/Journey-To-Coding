SELECT TOP 50
IM_ITEM.ITEM_NO AS 'CP ITEM_NO',
REPLACE(IM_ITEM.TRK_METH, 'G', 'SKU') AS 'Item Type',
IM_BARCOD.BARCOD AS 'Product SKU'
FROM IM_INV_CELL

JOIN IM_ITEM
ON IM_ITEM.ITEM_NO = IM_INV_CELL.ITEM_NO

JOIN IM_BARCOD
ON IM_INV_CELL.ITEM_NO = IM_BARCOD.ITEM_NO

WHERE
IM_ITEM.TRK_METH = 'G' AND

IM_INV_CELL.QTY_AVAIL > 0 AND
IM_BARCOD.BARCOD_ID = 'BIGCOM' AND
IM_ITEM.TRK_METH = 'G' AND
IM_ITEM.IS_ECOMM_ITEM = 'Y' AND
IM_ITEM.USR_WEB_STATUS != 'DISABLED' AND
IM_BARCOD.DIM_1_UPR = IM_INV_CELL.DIM_1_UPR AND
IM_BARCOD.DIM_2_UPR = IM_INV_CELL.DIM_2_UPR AND
IM_BARCOD.DIM_3_UPR = IM_INV_CELL.DIM_3_UPR OR
IM_ITEM.TRK_METH = 'N' AND
IM_INV_CELL.QTY_AVAIL > 0 AND
IM_ITEM.IS_ECOMM_ITEM = 'Y' AND
IM_ITEM.USR_WEB_STATUS != 'DISABLED'
