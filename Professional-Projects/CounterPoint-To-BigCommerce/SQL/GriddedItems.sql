SELECT
IM_ITEM.IS_ECOMM_ITEM AS 'Enabled',
IM_INV_CELL.ITEM_NO AS 'CounterPoint Item Number',
IM_ITEM.TRK_METH AS 'CounterPoint Tracking Method',
'SKU' AS 'Item Type',
NULL AS 'Product ID',
REPLACE(REPLACE(IM_ITEM.TRK_METH,'G','SKU'),'N','PRODUCT') AS 'Item Type',
'P' AS 'Product Type',
IM_BARCOD.BARCOD AS 'Product Code/SKU',
--IM_INV.BIN_1 AS 'Bin Picking Number',
IM_ITEM.PROF_ALPHA_2 AS 'Brand Name',
IM_ITEM.DIM_COD_LABEL AS 'Option Set',
--NULL AS 'Option Set Align',
EC_ITEM_DESCR.HTML_DESCR AS 'Product Description',
IM_ITEM.PRC_1 AS 'Price',
IM_ITEM.LST_COST AS 'Cost Price',
IM_ITEM.REG_PRC AS 'Retail Price',
IM_ITEM.PRC_1 AS 'Sale Price',
--NULL AS 'Fixed Shipping Cost',
--NULL AS 'Free Shipping',
--IM_ITEM.WARR_PRD_1 AS 'Product Warranty',
IM_ITEM.WEIGHT AS 'Product Weight',
IM_ITEM.PROF_NO_2 AS 'Product Width',
IM_ITEM.PROF_NO_1 AS 'Product Height',
IM_ITEM.PROF_NO_3 AS 'Product Depth',
REPLACE(IM_ITEM.USR_DISABLE_PURCHASE, 'N','Y') AS 'Allow Purchases?',
IM_ITEM.USR_WEB_VISIBILITY AS 'Product Visible?',
--NULL AS 'Product Availability',
REPLACE(IM_ITEM.USR_ALWAYS_IN_STOCK,'N','Y') AS 'Track Inventory',
IM_INV_CELL.QTY_AVAIL AS 'Current Stock Level',
IM_ITEM.USR_QTY_STOCK_THRESHOLD AS 'Low Stock Level',
IM_ITEM.CATEG_SUBCAT AS 'Category', --Not accurate, needs help
--NULL AS 'Product File - 1',
--NULL AS 'Product File Description - 1',
--NULL AS 'Product File Max Downloads - 1',
--NULL AS 'Product File Expires After - 1',
--NULL AS 'Product Image ID - 1', --BigCommerce System Generated
'https://high-mountain-sports4.mybigcommerce.com/dav/product_images/' + REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR + '^' + IM_INV_CELL.DIM_2_UPR + '^' + IM_INV_CELL.DIM_3_UPR +
'.JPG'),'^*','') AS
'Product Image Path (File) - 1',
IM_ITEM.ADDL_DESCR_1 AS 'Product Image Description - 1',
'N' AS 'Product Image Is Thumbnail - 1',
--NULL AS 'Product Image Index (Sort) - 1',
IM_ITEM_NOTE.NOTE AS 'Search Keywords',
IM_ITEM.USR_META_TITLE AS 'Page Title',
IM_ITEM_NOTE.NOTE AS 'Meta Keywords',
IM_ITEM.USR_META_DESCR AS 'Meta Description',
--NULL AS 'MYOB Asset Acct',
--NULL AS 'MYOB Income Acct',
--NULL AS 'MYOB Expense Acct',
IM_ITEM.PROF_COD_3 AS 'Product Condition',
'Y' AS 'Show Product Condition?',
--NULL AS 'Sort Order',
IM_ITEM.TAX_CATEG_COD AS 'Product Tax Class',
IM_ITEM.PROF_ALPHA_1 AS 'Product UPC/EAN',
--NULL AS 'Stop Processing Rules',
--NULL AS 'Product URL',
'Y' AS 'Redirect Old URL?',
IM_ITEM.PROF_ALPHA_1 AS 'GPS Global Trade Item Number',
IM_ITEM.PROF_ALPHA_3 AS 'GPS Manufacturer Part Number',
IM_ITEM.PROF_COD_5 AS 'GPS Gender',
IM_ITEM.PROF_COD_4 AS 'GPS Age Group',
IM_ITEM.USR_COLOR AS 'GPS Color',
IM_ITEM.USR_SIZE AS 'GPS Size',
--NULL AS 'GPS Material',
--NULL AS 'GPS Pattern',
--NULL AS 'GPS Item Group ID',
IM_ITEM.USR_GOOGLE_CATEGORY_ID AS 'GPS Category',
IM_ITEM.USR_GOOGLE_SHOPPING_FEED AS 'GPS Enabled'
--NULL AS 'Avalara Product Tax Code',


FROM IM_BARCOD

JOIN IM_ITEM
ON IM_ITEM.ITEM_NO = IM_BARCOD.ITEM_NO

JOIN IM_ITEM_NOTE
ON IM_ITEM_NOTE.ITEM_NO = IM_BARCOD.ITEM_NO

JOIN IM_INV_CELL
ON IM_INV_CELL.ITEM_NO = IM_BARCOD.ITEM_NO

JOIN EC_ITEM_DESCR
ON EC_ITEM_DESCR.ITEM_NO = IM_BARCOD.ITEM_NO

WHERE
IM_BARCOD.BARCOD_ID = 'ITEM' AND
IM_ITEM_NOTE.NOTE_ID = 'METAKEY' AND
IM_INV_CELL.LOC_ID = 'MAIN' AND
IM_INV_CELL.QTY_AVAIL > 0 AND
IM_ITEM.IS_ECOMM_ITEM = 'Y' AND
IM_ITEM.USR_WEB_STATUS != 'DISABLED' AND
IM_BARCOD.DIM_1_UPR = IM_INV_CELL.DIM_1_UPR AND
IM_BARCOD.DIM_2_UPR = IM_INV_CELL.DIM_2_UPR AND
IM_BARCOD.DIM_3_UPR = IM_INV_CELL.DIM_3_UPR
