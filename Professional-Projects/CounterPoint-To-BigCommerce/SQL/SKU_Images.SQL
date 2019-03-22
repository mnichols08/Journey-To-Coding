SELECT
--IM_INV_CELL.ITEM_NO AS 'CounterPoint Item Number',
--REPLACE(REPLACE(IM_ITEM.TRK_METH,'G','Gridded'),'N','Simple') AS 'CounterPoint Tracking Method',
NULL AS 'Product ID',
--'SKU' AS 'Item Type',
--'P' AS 'Product Type',
CASE
WHEN IM_INV_CELL.DIM_3_UPR = '*'
THEN
IM_ITEM.ITEM_NO + '|' + IM_INV_CELL.DIM_1_UPR + '|' + IM_INV_CELL.DIM_2_UPR
ELSE
REPLACE(IM_ITEM.ITEM_NO + '|' + IM_INV_CELL.DIM_1_UPR + '|' + IM_INV_CELL.DIM_2_UPR + '|' +
IM_INV_CELL.DIM_3_UPR, '|*|*','|*')
END AS 'Product Code/SKU',
--  CASE
--  WHEN IM_ITEM.GRID_DIM_3_TAG <> '' AND IM_ITEM.GRID_DIM_3_TAG IS NOT NULL
--  THEN
--  '[RT]' + IM_ITEM.GRID_DIM_1_TAG + '=' + IM_BARCOD.DIM_1_UPR + ',[S]' +
--IM_ITEM.GRID_DIM_2_TAG + '=' + IM_BARCOD.DIM_2_UPR+ ',[RB]' + IM_ITEM.GRID_DIM_3_TAG + '='
--+ IM_BARCOD.DIM_3_UPR
--  WHEN IM_ITEM.GRID_DIM_2_TAG <> '' AND IM_ITEM.GRID_DIM_2_TAG IS NOT NULL
--  THEN
--'[RT]' + IM_ITEM.GRID_DIM_1_TAG + '=' + IM_BARCOD.DIM_1_UPR + ',[S]' +
--IM_ITEM.GRID_DIM_2_TAG + '=' + IM_BARCOD.DIM_2_UPR
--  ELSE
--  '[RT]' + IM_ITEM.GRID_DIM_1_TAG + '=' + IM_BARCOD.DIM_1_UPR
--  END AS 'Product Name',
--IM_INV.BIN_1 AS 'Bin Picking Number',
--NULL AS 'Brand Name',
--NULL AS 'Option Set',
--NULL AS 'Option Set Align',
--NULL AS 'Product Description',
--NULL AS 'Price',
--NULL AS 'Cost Price',
--NULL AS 'Retail Price',
--NULL AS 'Sale Price',
--NULL AS 'Fixed Shipping Cost',
--NULL AS 'Free Shipping',
--NULL AS 'Product Warranty',
--NULL AS 'Product Weight',
NULL AS 'Product Width',
NULL AS 'Product Height',
NULL AS 'Product Depth',
--NULL AS 'Allow Purchases?',
--NULL AS 'Product Visible?',
--NULL AS 'Product Availability',
--'by option' AS 'Track Inventory',
--IM_INV_CELL.QTY_AVAIL AS 'Current Stock Level',
--NULL AS 'Low Stock Level',
NULL AS 'Category', --Not accurate, needs help
--NULL AS 'Product File - 1',
--NULL AS 'Product File Description - 1',
--NULL AS 'Product File Max Downloads - 1',
--NULL AS 'Product File Expires After - 1',
--NULL AS 'Product Image ID - 1', --BigCommerce System Generated
CASE
WHEN IM_ITEM.DIM_COD_LABEL = 'Size'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Color'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR + '.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Color / Size'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR +
'.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Size / Color'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_2_UPR +
'.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Lock no'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
ELSE
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
END AS 'Product Image File - 1',
IM_ITEM.ADDL_DESCR_1 AS 'Product Image Description - 1',
'Y' AS 'Product Image Is Thumbnail - 1',
1 AS 'Product Image Index (Sort) - 1',
NULL AS 'Product Image File - 2',
NULL as 'Product Image Description - 2',
NULL AS 'Product Image Index (Sort) - 2',

NULL AS 'Product Image File - 3',
NULL as 'Product Image Description - 3',
NULL AS 'Product Image Index (Sort) - 3',

NULL AS 'Product Image File - 4',
NULL as 'Product Image Description - 4',
NULL AS 'Product Image Index (Sort) - 4',

NULL AS 'Product Image File - 5',
NULL as 'Product Image Description - 5',
NULL AS 'Product Image Index (Sort) - 5',

NULL AS 'Product Image File - 6',
NULL as 'Product Image Description - 6',
NULL AS 'Product Image Index (Sort) - 6',

NULL AS 'Product Image File - 7',
NULL as 'Product Image Description - 7',
NULL AS 'Product Image Index (Sort) - 7',

NULL AS 'Product Image File - 8',
NULL as 'Product Image Description - 8',
NULL AS 'Product Image Index (Sort) - 8',

NULL AS 'Product Image File - 9',
NULL as 'Product Image Description - 9',
NULL AS 'Product Image Index (Sort) - 9',

NULL AS 'Product Image File - 10',
NULL as 'Product Image Description - 10',
NULL AS 'Product Image Index (Sort) - 10',

NULL AS 'Product Image File - 11',
NULL as 'Product Image Description - 11',
NULL AS 'Product Image Index (Sort) - 11',

NULL AS 'Product Image File - 12',
NULL as 'Product Image Description - 12',
NULL AS 'Product Image Index (Sort) - 12',

NULL AS 'Product Image File - 13',
NULL as 'Product Image Description - 13',
NULL AS 'Product Image Index (Sort) - 13',

NULL AS 'Product Image File - 14',
NULL as 'Product Image Description - 14',
NULL AS 'Product Image Index (Sort) - 14',

NULL AS 'Product Image File - 15',
NULL as 'Product Image Description - 15',
NULL AS 'Product Image Index (Sort) - 15',
--NULL AS 'Product Image ID - 2', --BigCommerce System Generated
--CASE
--WHEN IM_ITEM.DIM_COD_LABEL = 'Size'
--THEN
--LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
--(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '-FRONT.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
--WHEN IM_ITEM.DIM_COD_LABEL = 'Color'
--THEN
--LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
--(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
--+ '^' + IM_INV_CELL.DIM_1_UPR + '-FRONT.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
--WHEN IM_ITEM.DIM_COD_LABEL = 'Color / Size'
--THEN
--LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
--(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
--+ '^' + IM_INV_CELL.DIM_1_UPR +
--'-FRONT.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
--WHEN IM_ITEM.DIM_COD_LABEL = 'Size / Color'
--THEN
--LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
--(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
--+ '^' + IM_INV_CELL.DIM_2_UPR +
--'-FRONT.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
--WHEN IM_ITEM.DIM_COD_LABEL = 'Lock no'
--THEN
--LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
--(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '-FRONT.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
--ELSE
--LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
--(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
--+ '-FRONT.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
--END AS 'Product Image File - 2',
--IM_ITEM.ADDL_DESCR_1 + ' Front Image' AS 'Product Image Description - 2',
--'Y' AS 'Product Image Is Thumbnail - 2',
--NULL AS 'Product Image Index (Sort) - 2',
--NULL AS 'Product Image ID - 3', --BigCommerce System Generated
NULL AS 'Search Keywords'--,
--NULL AS 'Page Title',
--NULL AS 'Meta Keywords',
--NULL AS 'Meta Description',
--NULL AS 'MYOB Asset Acct',
--NULL AS 'MYOB Income Acct',
--NULL AS 'MYOB Expense Acct',
--NULL AS 'Product Condition',
--NULL AS 'Show Product Condition?',
--NULL AS 'Sort Order',
--NULL AS 'Product Tax Class',
--NULL AS 'Product UPC/EAN',
--NULL AS 'Stop Processing Rules',
--NULL AS 'Product URL',
--NULL AS 'Redirect Old URL?',
--NULL AS 'GPS Global Trade Item Number',
--NULL AS 'GPS Manufacturer Part Number',
--NULL AS 'GPS Gender',
--NULL AS 'GPS Age Group',
--NULL AS 'GPS Color',
--NULL AS 'GPS Size',
--NULL AS 'GPS Material',
--NULL AS 'GPS Pattern',
--NULL AS 'GPS Item Group ID',
--NULL AS 'GPS Category',
--NULL AS 'GPS Enabled'
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
--IM_INV_CELL.QTY_AVAIL > 0 AND
IM_ITEM.IS_ECOMM_ITEM = 'Y' AND
IM_BARCOD.DIM_1_UPR = IM_INV_CELL.DIM_1_UPR AND
IM_BARCOD.DIM_2_UPR = IM_INV_CELL.DIM_2_UPR AND
IM_BARCOD.DIM_3_UPR = IM_INV_CELL.DIM_3_UPR
