SELECT
--IM_ITEM.ITEM_NO AS 'CounterPoint Item Number',
--REPLACE(REPLACE(IM_ITEM.TRK_METH,'G','Gridded'),'N','Simple') AS 'CounterPoint Tracking Method',
NULL AS 'Product ID',
--'PRODUCT' AS 'Item Type',
--'P' AS 'Product Type',
IM_ITEM.ITEM_NO + '|*' AS 'Product Code/SKU',
--IM_ITEM.ADDL_DESCR_1 AS 'Product Name',
--IM_INV.BIN_1 AS 'Bin Picking Number',
--IM_ITEM.PROF_ALPHA_2 AS 'Brand Name',
--IM_ITEM.ITEM_NO + '*' + IM_ITEM.ITEM_VEND_NO + ' / ' + IM_ITEM.DIM_COD_LABEL AS 'Option Set',
--NULL AS 'Option Set Align',
--EC_ITEM_DESCR.HTML_DESCR AS 'Product Description',
--IM_ITEM.PRC_1 AS 'Price',
--IM_ITEM.LST_COST AS 'Cost Price',
--IM_ITEM.REG_PRC AS 'Retail Price',
--IM_ITEM.PRC_1 AS 'Sale Price',
--NULL AS 'Fixed Shipping Cost',
--NULL AS 'Free Shipping',
--IM_ITEM.WARR_PRD_1 AS 'Product Warranty',
--IM_ITEM.WEIGHT AS 'Product Weight',
IM_ITEM.PROF_NO_2 AS 'Product Width',
IM_ITEM.PROF_NO_1 AS 'Product Height',
IM_ITEM.PROF_NO_3 AS 'Product Depth',
--REPLACE(IM_ITEM.USR_DISABLE_PURCHASE, 'N','Y') AS 'Allow Purchases?',
--IM_ITEM.USR_WEB_VISIBILITY AS 'Product Visible?',
--NULL AS 'Product Availability',
--REPLACE(REPLACE(IM_ITEM.TRK_METH,'G','by product'),'N','by option') AS 'Track Inventory?',
--IM_INV.QTY_AVAIL AS 'Current Stock Level',
--IM_ITEM.USR_QTY_STOCK_THRESHOLD AS 'Low Stock Level',
IM_ITEM.ATTR_COD_1 + '/' + IM_ITEM.ATTR_COD_2 + '/' + IM_ITEM.ATTR_COD_3 + '/' + IM_ITEM.ATTR_COD_4 + '/' + IM_ITEM.ATTR_COD_5 + '/' + IM_ITEM.ATTR_COD_6 + '/' +  EC_CATEG.DESCR AS 'Category', --Not accurate, needs help, but better than Modern Retails
--NULL AS 'Product File - 1',
--NULL AS 'Product File Description - 1',
--NULL AS 'Product File Max Downloads - 1',
--NULL AS 'Product File Expires After - 1',
--NULL AS 'Product Image ID - 1', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '.JPG') AS 'Product Image File - 1',
IM_ITEM.ADDL_DESCR_1 AS 'Product Image Description - 1',
'Y' AS 'Product Image Is Thumbnail - 1',
1 AS 'Product Image Index (Sort) - 1',
--NULL AS 'Product Image ID - 2', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-FRONT.JPG') AS 'Product Image File - 2',
IM_ITEM.ADDL_DESCR_1 + ' Front Image' AS 'Product Image Description - 2',
--'N' AS 'Product Image Is Thumbnail - 2',
2 AS 'Product Image Index (Sort) - 2',
--NULL AS 'Product Image ID - 3', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-BACK.JPG') AS 'Product Image File - 3',
IM_ITEM.ADDL_DESCR_1 + ' Back Image' AS 'Product Image Description - 3',
--'N' AS 'Product Image Is Thumbnail - 3',
3 AS 'Product Image Index (Sort) - 3',
--NULL AS 'Product Image ID - 4', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-SIDE.JPG') AS 'Product Image File - 4',
IM_ITEM.ADDL_DESCR_1 + ' Side Image' AS 'Product Image Description - 4',
--'N' AS 'Product Image Is Thumbnail - 4',
4 AS 'Product Image Index (Sort) - 4',
--NULL AS 'Product Image ID - 5', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-1.JPG') AS 'Product Image File - 5',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 1' AS 'Product Image Description - 5',
--'N' AS 'Product Image Is Thumbnail - 5',
5 AS 'Product Image Index (Sort) - 5',
--NULL AS 'Product Image ID - 5', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-2.JPG') AS 'Product Image File - 6',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 2' AS 'Product Image Description - 6',
--'N' AS 'Product Image Is Thumbnail - 6',
6 AS 'Product Image Index (Sort) - 6',
--NULL AS 'Product Image ID - 6', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-3.JPG') AS 'Product Image File - 7',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 3' AS 'Product Image Description - 7',
--'N' AS 'Product Image Is Thumbnail - 7',
7 AS 'Product Image Index (Sort) - 7',
--NULL AS 'Product Image ID - 8', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-4.JPG') AS 'Product Image File - 8',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 4' AS 'Product Image Description - 8',
--'N' AS 'Product Image Is Thumbnail - 8',
8 AS 'Product Image Index (Sort) - 8',

--NULL AS 'Product Image ID - 9', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-5.JPG') AS 'Product Image File - 9',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 5' AS 'Product Image Description - 9',
--'N' AS 'Product Image Is Thumbnail - 9',
9 AS 'Product Image Index (Sort) - 9',

--NULL AS 'Product Image ID - 10', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-6.JPG') AS 'Product Image File - 10',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 6' AS 'Product Image Description - 10',
--'N' AS 'Product Image Is Thumbnail - 10',
10 AS 'Product Image Index (Sort) - 10',

--NULL AS 'Product Image ID - 11', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-6.JPG') AS 'Product Image File - 11',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 7' AS 'Product Image Description - 11',
--'N' AS 'Product Image Is Thumbnail - 11',
11 AS 'Product Image Index (Sort) - 11',

--NULL AS 'Product Image ID - 12', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-7.JPG') AS 'Product Image File - 12',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 8' AS 'Product Image Description - 12',
--'N' AS 'Product Image Is Thumbnail - 12',
12 AS 'Product Image Index (Sort) - 12',

--NULL AS 'Product Image ID - 13', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-8.JPG') AS 'Product Image File - 13',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 9' AS 'Product Image Description - 13',
--'N' AS 'Product Image Is Thumbnail - 13',
13 AS 'Product Image Index (Sort) - 13',

--NULL AS 'Product Image ID - 14', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-9.JPG') AS 'Product Image File - 14',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 10' AS 'Product Image Description - 14',
--'N' AS 'Product Image Is Thumbnail - 14',
14 AS 'Product Image Index (Sort) - 14',

--NULL AS 'Product Image ID - 15', --BigCommerce System Generated
LOWER('https://www.highmountainsports.com/media/catalog/product/' + IM_ITEM.ITEM_NO + '-10.JPG') AS 'Product Image File - 15',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 11' AS 'Product Image Description - 15',
--'N' AS 'Product Image Is Thumbnail - 15',
15 AS 'Product Image Index (Sort) - 15',

IM_ITEM_NOTE.NOTE AS 'Search Keywords'--,

--IM_ITEM.USR_META_TITLE AS 'Page Title',
--IM_ITEM_NOTE.NOTE AS 'Meta Keywords',
--IM_ITEM.USR_META_DESCR AS 'Meta Description',
--NULL AS 'MYOB Asset Acct',
--NULL AS 'MYOB Income Acct',
--NULL AS 'MYOB Expense Acct',
--IM_ITEM.PROF_COD_3 AS 'Product Condition',
--'Y' AS 'Show Product Condition?',
--NULL AS 'Sort Order',
--IM_ITEM.TAX_CATEG_COD AS 'Product Tax Class',
--IM_ITEM.PROF_ALPHA_1 AS 'Product UPC/EAN',
--NULL AS 'Stop Processing Rules',
--NULL AS 'Product URL',
--'Y' AS 'Redirect Old URL?',
--IM_ITEM.PROF_ALPHA_1 AS 'GPS Global Trade Item Number',
--IM_ITEM.PROF_ALPHA_3 AS 'GPS Manufacturer Part Number',
--IM_ITEM.PROF_COD_5 AS 'GPS Gender',
--IM_ITEM.PROF_COD_4 AS 'GPS Age Group',
--IM_ITEM.USR_COLOR AS 'GPS Color',
--IM_ITEM.USR_SIZE AS 'GPS Size',
--NULL AS 'GPS Material',
--NULL AS 'GPS Pattern',
--NULL AS 'GPS Item Group ID',
--IM_ITEM.USR_GOOGLE_CATEGORY_ID AS 'GPS Category',
--IM_ITEM.USR_GOOGLE_SHOPPING_FEED AS 'GPS Enabled'
--NULL AS 'Avalara Product Tax Code',


FROM IM_ITEM

JOIN EC_ITEM_DESCR
ON IM_ITEM.ITEM_NO = EC_ITEM_DESCR.ITEM_NO

JOIN EC_CATEG_ITEM
ON IM_ITEM.ITEM_NO = EC_CATEG_ITEM.ITEM_NO

JOIN EC_CATEG
ON EC_CATEG.CATEG_ID = EC_CATEG_ITEM.CATEG_ID

JOIN IM_INV
ON IM_INV.ITEM_NO = IM_ITEM.ITEM_NO

JOIN IM_ITEM_NOTE
ON IM_ITEM.ITEM_NO = IM_ITEM_NOTE.ITEM_NO

WHERE

IM_INV.LOC_ID = 'MAIN' AND

IM_ITEM_NOTE.NOTE_ID = 'METAKEY' AND

IM_ITEM.IS_ECOMM_ITEM = 'Y' --AND

--IM_INV.QTY_AVAIL > 0
