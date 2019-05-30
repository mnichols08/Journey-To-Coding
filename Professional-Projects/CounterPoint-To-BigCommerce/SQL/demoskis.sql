DECLARE @url VARCHAR(500);SET @url = 'http://75.151.232.37:5483/';DECLARE @sep VARCHAR
(1);SET @sep = '^';
SELECT NULL AS 'Product ID', 'PRODUCT' AS 'Item Type', 'P' AS 'Product Type', IM_ITEM.ITEM_NO 
+ '|**' AS 'Product Code/SKU', IM_ITEM.ADDL_DESCR_1 AS 'Product Name', IM_INV.BIN_1 AS 'Bin 
Picking Number', IM_ITEM.PROF_ALPHA_2 AS 'Brand Name', IM_ITEM.ITEM_NO + ' / ' + 
IM_ITEM.DIM_COD_LABEL AS 'Option Set',
NULL AS 'Option Set Align',EC_ITEM_DESCR.HTML_DESCR AS 'Product 
Description',IM_ITEM_NOTE.NOTE AS 'Search Keywords',IM_ITEM_NOTE.NOTE AS 'Meta 
Keywords',IM_ITEM.PRC_1 AS 'Price',IM_ITEM.LST_COST AS 'Cost Price',IM_ITEM.REG_PRC AS 
'Retail Price',IM_ITEM.PRC_1 AS 'Sale Price',  CASE WHEN IM_ITEM.WEIGHT > 199 THEN '999' 
WHEN IM_ITEM.WEIGHT < 199 AND IM_ITEM.WEIGHT > 30 OR IM_ITEM.PROF_ALPHA_2 = 
'Yakima' AND IM_ITEM.WEIGHT > 5 THEN '50' ELSE NULL END AS 'Fixed Shipping Cost',
CASE WHEN IM_ITEM.WEIGHT < 199 AND IM_ITEM.WEIGHT > 30 OR IM_ITEM.PROF_ALPHA_2 = 
'Yakima' AND IM_ITEM.WEIGHT > 5 THEN 'N' WHEN IM_ITEM.PRC_1 > 49.99 AND 
IM_ITEM.WEIGHT < 30 THEN 'Y' WHEN IM_ITEM.PRC_1 < 49.99 AND IM_ITEM.WEIGHT < 1 THEN 
'Y' ELSE 'N' END AS 'Free Shipping',IM_ITEM.WEIGHT AS 'Product Weight',
IM_ITEM.PROF_NO_2 AS 'Product Width',IM_ITEM.PROF_NO_1 AS 'Product 
Height',IM_ITEM.PROF_NO_3 AS 'Product Depth',REPLACE(IM_ITEM.USR_DISABLE_PURCHASE, 
'N','Y') AS 'Allow Purchases?','Y' AS 'Product Visible?',
CASE WHEN IM_ITEM.WEIGHT < 199 AND IM_ITEM.WEIGHT > 30 OR IM_ITEM.PROF_ALPHA_2 = 
'Yakima' AND IM_ITEM.WEIGHT > 5 THEN 'This item does not qualify for free shipping.' WHEN 
IM_ITEM.WEIGHT > 199 THEN 'In Store Pickup Only' WHEN IM_ITEM.WEIGHT < 30 AND 
IM_ITEM.PROF_ALPHA_2 != 'Yakima' THEN 'Usually Ships Within 24 Hours' ELSE 'Usually Ships 
Within 24 Hours' END AS 'Product Availability',CASE WHEN IM_ITEM.TRK_METH = 'G' THEN 'by 
option' ELSE 'by product' END AS 'Track Inventory?',
IM_INV.QTY_AVAIL AS 'Current Stock Level',IM_ITEM.USR_QTY_STOCK_THRESHOLD AS 'Low 
Stock Level',VI_EC_CATEG_TREE.PATH AS 'Category',NULL AS 'Product File - 1',NULL AS 'Product 
File Description - 1',NULL AS 'Product File Max Downloads - 1',NULL AS 'Product File Expires After - 
1',LOWER(@url + IM_ITEM.ITEM_NO + '.JPG') AS 'Product Image File - 1',
LOWER(@url + IM_ITEM.ITEM_NO + @sep + '1.JPG') AS 'Product Image File - 2','=INDIRECT
(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 3','=INDIRECT(ADDRESS(ROW(),COLUMN
()-1))' AS 'Product Image File - 4','=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 
5','=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 6','=INDIRECT(ADDRESS
(ROW(),COLUMN()-1))' AS 'Product Image File - 7','=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 
'Product Image File - 8','=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 9',
'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 10','=INDIRECT(ADDRESS
(ROW(),COLUMN()-1))' AS 'Product Image File - 11','=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 
'Product Image File - 12','=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 
13','=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 14','=INDIRECT(ADDRESS
(ROW(),COLUMN()-1))' AS 'Product Image File - 15',IM_ITEM.ADDL_DESCR_1 AS 'Product Image 
Description - 1','Y' AS 'Product Image Is Thumbnail - 1',0 AS 'Product Image Sort - 1',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 1' AS 'Product Image Description - 2',1 AS 'Product 
Image Sort - 2',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 2' AS 'Product Image Description - 3',2 AS 
'Product Image Sort - 3',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 3' AS 'Product Image Description 
- 4',3 AS 'Product Image Sort - 4',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 4' AS 'Product Image 
Description - 5',4 AS 'Product Image Sort - 5',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 5' AS 'Product Image Description - 6',5 AS 'Product 
Image Sort - 6',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 6' AS 'Product Image Description - 7',6 AS 
'Product Image Sort - 7',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 7' AS 'Product Image Description 
- 8',7 AS 'Product Image Sort - 8',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 8' AS 'Product Image 
Description - 9',8 AS 'Product Image Sort - 9',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 9' AS 'Product Image Description - 10',9 AS 'Product 
Image Sort - 10',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 10' AS 'Product Image Description - 
11',10 AS 'Product Image Sort - 11',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 11' AS 'Product 
Image Description - 12',11 AS 'Product Image Sort - 12',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 
12' AS 'Product Image Description - 13',12 AS 'Product Image Sort - 13',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 13' AS 'Product Image Description - 14',13 AS 'Product 
Image Sort - 14',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 14' AS 'Product Image Description - 
15',14 AS 'Product Image Sort - 15',IM_ITEM.USR_META_TITLE AS 'Page 
Title',IM_ITEM.USR_META_DESCR AS 'Meta Description',NULL AS 'MYOB Asset Acct',NULL AS 
'MYOB Income Acct',NULL AS 'MYOB Expense Acct',IM_ITEM.PROF_COD_3 AS 'Product Condition',
'Y' AS 'Show Product Condition?',NULL AS 'Sort Order',NULL AS 'Product Tax 
Class',IM_ITEM.PROF_ALPHA_1 AS 'Product UPC/EAN',NULL AS 'Stop Processing Rules',NULL AS 
'Product URL','Y' AS 'Redirect Old URL?',IM_ITEM.PROF_ALPHA_1 AS 'GPS Global Trade Item 
Number',IM_ITEM.PROF_ALPHA_3 AS 'GPS Manufacturer Part Number',IM_ITEM.PROF_COD_5 AS 
'GPS Gender',
IM_ITEM.PROF_COD_4 AS 'GPS Age Group',IM_ITEM.USR_COLOR AS 'GPS 
Color',IM_ITEM.USR_SIZE AS 'GPS Size',NULL AS 'GPS Material',NULL AS 'GPS Pattern',NULL AS 
'GPS Item Group ID',VI_EC_CATEG_TREE.PATH  AS 'GPS 
Category',IM_ITEM.USR_GOOGLE_SHOPPING_FEED AS 'GPS Enabled',NULL AS 'Avalara Product 
Tax Code',
CASE WHEN IM_ITEM.PROF_ALPHA_4 = 'ORM-D' THEN 'ORMD=This item must ship via ground 
method.' WHEN IM_ITEM.PROF_ALPHA_4 = 'Prop65' THEN 'Prop 65=California customers, this item is 
a Propositon 65 Item.' WHEN IM_ITEM.PROF_ALPHA_4 = 'Prop65 ORM-D' THEN 'Prop 65=California 
customers, this item is a Propositon 65 Item.;ORMD=This item must ship via ground method.' WHEN 
IM_ITEM.PROF_ALPHA_4 = 'SwimSuit' THEN 'Returns=No returns on swimwear items.' WHEN 
IM_ITEM.PROF_ALPHA_4 = 'Prop65 SwimSuit' THEN 'Prop 65=California customers, this item is a 
Propositon 65 Item.;Returns=No returns on swimwear items.'
ELSE '' END AS 'Product Custom Fields' FROM IM_ITEM
JOIN EC_ITEM_DESCR ON IM_ITEM.ITEM_NO = EC_ITEM_DESCR.ITEM_NO
JOIN EC_CATEG_ITEM ON IM_ITEM.ITEM_NO = EC_CATEG_ITEM.ITEM_NO
JOIN VI_EC_CATEG_TREE ON EC_CATEG_ITEM.CATEG_ID = VI_EC_CATEG_TREE.CATEG_ID
JOIN EC_CATEG ON EC_CATEG.CATEG_ID = EC_CATEG_ITEM.CATEG_ID
JOIN IM_INV ON IM_INV.ITEM_NO = IM_ITEM.ITEM_NO
JOIN IM_ITEM_NOTE ON IM_ITEM.ITEM_NO = IM_ITEM_NOTE.ITEM_NO
WHERE IM_ITEM_NOTE.NOTE_ID = 'METAKEY' AND IM_INV.LOC_ID = 'MAIN' AND 
VI_EC_CATEG_TREE.LVL1 != 'Promotions' AND VI_EC_CATEG_TREE.CATEG_ID = 
EC_CATEG_ITEM.CATEG_ID
AND (
IM_ITEM.ITEM_NO = 'DEMOSKI2018-01'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-02'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-03'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-04'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-05'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-06'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-07'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-08'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-09'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-10'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-11'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-12'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-13'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-14'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-15'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-16'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-17'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-18'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-19'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-20'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-21'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-22'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-23'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-24'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-25'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-26'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2018-27'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-01'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-02'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-03'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-04'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-05'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-06'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-07'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-08'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-09'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-10'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-11'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-12'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-13'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-14'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-15'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-16'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-17'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-18'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-19'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-20'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-21'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-22'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-23'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-24'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-25'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-26'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-27'

OR IM_ITEM.ITEM_NO = 'DEMOSKI2019-28'

OR IM_ITEM.ITEM_NO = ''
)
ORDER BY IM_ITEM.ITEM_NO
