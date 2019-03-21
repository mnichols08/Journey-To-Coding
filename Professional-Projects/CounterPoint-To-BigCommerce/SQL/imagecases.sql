CASE
WHEN IM_ITEM.DIM_COD_LABEL = 'Size'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '-BACK.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Color'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR + '-BACK.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Color / Size'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR +
'-BACK.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Size / Color'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_2_UPR +
'-BACK.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Lock no'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '-BACK.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
ELSE
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '-BACK.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
END AS 'Product Image File - 3',
IM_ITEM.ADDL_DESCR_1 + ' Back Image' AS 'Product Image Description - 3',
--'Y' AS 'Product Image Is Thumbnail - 3',
--NULL AS 'Product Image Index (Sort) - 3',
--NULL AS 'Product Image ID - 4', --BigCommerce System Generated
CASE
WHEN IM_ITEM.DIM_COD_LABEL = 'Size'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '-SIDE.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Color'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR + '-SIDE.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Color / Size'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR +
'-SIDE.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Size / Color'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_2_UPR +
'-SIDE.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Lock no'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '-SIDE.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
ELSE
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '-SIDE.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
END AS 'Product Image File - 4',
IM_ITEM.ADDL_DESCR_1 + ' Side Image' AS 'Product Image Description - 5',
--'Y' AS 'Product Image Is Thumbnail - 4',
--NULL AS 'Product Image Index (Sort) - 4',
--NULL AS 'Product Image ID - 5', --BigCommerce System Generated
CASE
WHEN IM_ITEM.DIM_COD_LABEL = 'Size'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '-1.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Color'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR + '-1.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Color / Size'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_1_UPR +
'-1.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Size / Color'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '^' + IM_INV_CELL.DIM_2_UPR +
'-1.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
WHEN IM_ITEM.DIM_COD_LABEL = 'Lock no'
THEN
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO + '-1.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
ELSE
LOWER('https://www.highmountainsports.com/media/catalog/product/' + REPLACE
(REPLACE(REPLACE(REPLACE((IM_ITEM.ITEM_NO
+ '-1.JPG'),'^*',''),'/','-'),' ',''),'^','-'))
END AS 'Product Image File - 5',
IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 1' AS 'Product Image Description - 5',
--'Y' AS 'Product Image Is Thumbnail - 5',
--NULL AS 'Product Image Index (Sort) - 5',
