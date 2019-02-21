SELECT
IM_ITEM.ITEM_NO AS 'CounterPoint Item Number',
'SKU' AS "Item Type",
NULL AS "Product ID",
IM_ITEM.ADDL_DESCR_1 AS "Product Name",
'P' AS "Product Type",
IM_BARCOD.BARCOD AS "Product Code/SKU",
IM_INV.BIN_1 AS 'Bin Picking Number',
IM_ITEM.PROF_ALPHA_2 AS 'Brand',
IM_ITEM.GRID_DIM_1_TAG AS 'Option Set',
NULL AS 'Option Set Align',
EC_ITEM_DESCR.HTML_DESCR AS 'Description',
IM_ITEM.PRC_1 AS 'Price',
IM_ITEM.LST_COST AS 'Cost Price',
IM_ITEM.REG_PRC AS 'Retail Price',
IM_ITEM.PRC_1 AS 'Sale Price',
NULL AS 'Fixed Shipping Cost',
NULL AS 'Free Shipping',
IM_ITEM.WARR_PRD_1 AS 'Warranty',
IM_ITEM.WEIGHT AS 'Weight',
IM_ITEM.PROF_NO_2 AS 'Width',
IM_ITEM.PROF_NO_1 AS ' Height',
IM_ITEM.PROF_NO_3 AS 'Depth',
IM_ITEM.USR_DISABLE_PURCHASE AS 'Allow Purchases?',
IM_ITEM.USR_WEB_VISIBILITY AS 'Product Visible?',
NULL AS 'Product Availability',
IM_ITEM.USR_ALWAYS_IN_STOCK AS 'Track Inventory',
IM_INV.QTY_AVAIL AS 'Stock Level',
IM_ITEM.USR_QTY_STOCK_THRESHOLD AS 'Low Stock Level',
IM_ITEM.USR_MAG_CATEG_TREE AS 'Category String',
NULL AS 'Product File - 1',
NULL AS 'Product File Description - 1',
NULL AS 'Product File Max Downloads - 1',
NULL AS 'Product File Expires After - 1',
NULL AS 'Product Image ID - 1', --BigCommerce System Generated
IM_ITEM.ITEM_NO + '.jpg' AS 'Product Image Path (File) - 1',
IM_ITEM.ADDL_DESCR_1 AS 'Product Image Description - 1',
'N' AS 'Product Image Is Thumbnail - 1',
NULL AS 'Product Image Index (Sort) - 1',
IM_ITEM_NOTE.NOTE AS 'Search Keywords',
IM_ITEM.USR_META_TITLE AS 'Page Title', -- Defaults to Product Name if left blank (Almost always will be)
IM_ITEM_NOTE.NOTE AS 'Meta Keywords',
IM_ITEM.USR_META_DESCR AS 'Meta Description',
NULL AS 'MYOB Asset Acct',
NULL AS 'MYOB Income Acct',
NULL AS 'MYOB Expense Acct',
IM_ITEM.PROF_COD_3 AS 'Product Condition',
'Y' AS 'Show Product Condition?',
NULL AS 'Sort Order',
IM_ITEM.TAX_CATEG_COD AS 'Product Tax Class',
IM_ITEM.PROF_ALPHA_1 AS 'Product UPC/EAN',
NULL AS 'Stop Processing Rules',
NULL AS 'Product URL',
'Y' AS 'Redirect Old URL?',
IM_ITEM.PROF_ALPHA_1 AS 'GPS Global Trade Item Number',
IM_ITEM.PROF_ALPHA_3 AS 'GPS Manufacturer Part Number',
IM_ITEM.PROF_COD_5 AS 'GPS Gender',
IM_ITEM.PROF_COD_4 AS 'GPS Age Group',
IM_ITEM.USR_COLOR AS 'GPS Color',
IM_ITEM.USR_SIZE AS 'GPS Size',
NULL AS 'GPS Material',
NULL AS 'GPS Pattern',
NULL AS 'GPS Item Group ID',
IM_ITEM.USR_GOOGLE_CATEGORY_ID AS 'GPS Category',
IM_ITEM.USR_GOOGLE_SHOPPING_FEED AS 'GPS Enabled',
NULL AS 'Avalara Product Tax Code',
IM_ITEM.PROF_ALPHA_2 + ' ' + IM_ITEM.ADDL_DESCR_1 AS 'Brand + Name'

FROM IM_ITEM

JOIN IM_ITEM_NOTE
ON IM_ITEM_NOTE.ITEM_NO = IM_ITEM.ITEM_NO
JOIN IM_BARCOD
ON IM_BARCOD.ITEM_NO = IM_ITEM.ITEM_NO
JOIN IM_INV
ON IM_INV.ITEM_NO = IM_ITEM.ITEM_NO
JOIN EC_ITEM_DESCR
ON EC_ITEM_DESCR.ITEM_NO = IM_INV.ITEM_NO
WHERE
IM_ITEM_NOTE.NOTE_ID = 'METAKEY' AND
IM_BARCOD.BARCOD_ID = 'ITEM' AND
IM_ITEM.TRK_METH = 'G' AND
IM_INV.LOC_ID = 'MAIN' AND
IM_INV.QTY_ON_HND > 0 AND
IM_ITEM.IS_ECOMM_ITEM = 'Y' AND
IM_ITEM.USR_WEB_STATUS != 'disabled'
