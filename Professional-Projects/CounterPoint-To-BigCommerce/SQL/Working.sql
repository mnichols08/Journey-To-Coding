SELECT
IM_BARCOD.ITEM_NO,
IM_BARCOD.SEQ_NO,
IM_BARCOD.BARCOD,
IM_BARCOD.DIM_1_UPR + '|' + IM_BARCOD.DIM_2_UPR + '|' + IM_BARCOD.DIM_3_UPR AS
'GRID DIMENSIONS',
IM_ITEM.ADDL_DESCR_1,
IM_ITEM.PROF_ALPHA_1 AS 'GTIN/UPC',
IM_ITEM.PROF_ALPHA_2 AS 'BRAND',
IM_ITEM.PROF_COD_1 AS 'AVAILABILITY',
IM_ITEM.PROF_COD_3 AS 'CONDITION',
IM_ITEM.PROF_COD_4 AS 'AGE GROUP',
IM_ITEM.PROF_COD_5 AS 'GENDER',
IM_ITEM.GRID_DIM_1_TAG AS 'DIMENSION 1 TAG',
IM_ITEM.GRID_DIM_2_TAG AS 'DIMENSION 2 TAG',
IM_ITEM.GRID_DIM_3_TAG AS 'DIMENSION 3 TAG',
IM_ITEM.PRC_1 AS 'PRICE-1',
IM_ITEM.LST_COST AS 'COST',
IM_ITEM.REG_PRC AS 'MSRP',
IM_ITEM.DIM_COD_LABEL AS 'DIMENSION LABEL',
IM_ITEM.USR_GOOGLE_SHOPPING_FEED,
IM_ITEM.USR_DISABLE_PURCHASE,
IM_ITEM.USR_DISABLE_PURCHASE_TEXT,
--IM_INV_CELL.ITEM_NO AS 'CP ITEM_NO',
--IM_INV_CELL.DIM_1_UPR + '|' + IM_INV_CELL.DIM_2_UPR + '|' + IM_INV_CELL.DIM_3_UPR AS 'DIMENSIONS',
IM_INV_CELL.QTY_AVAIL AS 'QTY AVAIL'

FROM IM_ITEM

JOIN IM_BARCOD
ON IM_BARCOD.ITEM_NO = IM_ITEM.ITEM_NO

JOIN IM_INV_CELL
ON IM_INV_CELL.DIM_1_UPR = IM_BARCOD.DIM_1_UPR

WHERE
IM_ITEM.ITEM_TYP = 'I' AND
IM_ITEM.TRK_METH = 'G' AND
IM_ITEM.IS_ECOMM_ITEM = 'Y' AND
IM_ITEM.USR_WEB_STATUS != 'disabled' AND
IM_BARCOD.BARCOD_ID = 'ITEM' AND
IM_INV_CELL.QTY_AVAIL > 0

-- Export selected fields from IM_ITEM table, which
-- are Gridded Inventory Items that are flagged for Ecommerce
-- and the web status is not set to disabled.
