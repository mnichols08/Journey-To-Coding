;Created by:			Mike Nichols
;email:					mikey@mnzen.com
Global $Program_Name =	"CP to BC"
Global $version =		 "1.5" ;20190522

;export new fields

Opt("MouseCoordMode",0)
Opt("WinTitleMatchMode",2)
Opt("WinWaitDelay",550)
Opt("PixelCoordMode",0)
Opt("GUIOnEventMode",1)

#include <File.au3>
#include <ClipBoard.au3>
#include <GUIConstantsEx.au3>
#include <array.au3>
#include <String.au3>

#Region Variables
Dim $HTML_Array[21][2],$Start_Edit_Cord[2],$Standard_Array[1][1],$Grid_Array[1][1],$GridMap_Array[1][1]
Dim $Ounce_Array[13][2],$VariationValueArray[1][1]
Dim $r,$EditList,$IDinput,$Item_Condition,$VarCheck
Dim $SQL_SelectPlus_Products,$SQL_WherePre_Products,$SQL_WherePost_Products,$SQL_Post_Products
Dim $SQL_SelectPlus2,$SQL_WherePre2,$SQL_WherePost2,$SQL_Post2,$SQL2,$GridMap_Array,$Cline,$Sline
Dim $Parent_Price1,$Parent_RegPrice,$Parent_Category,$Parent_VariableTitle[3],$Parent_ID,$Parent_MSRP,$Parent_BuyNow,$Variation_Lines

Global Const	$UseVarTrue	= "True"	;The value to use to denote if an item should use variations in SixBit


#Region File Values

Local Const		$FileLocation			= StringTrimRight(FileGetLongName("CSVExporter.exe",1),24)			;location of the program
Dim Const		$Log_File				= $FileLocation & $Program_Name & $version & ".log"					;name/location for the program log file
Dim Const		$ExportProducts			= "\\Hmsvr1\cpsql.1\Toplevel\HMS\Configuration\ItemImages\CSV\PRODUCTS.csv"												;name/location of standard item info export from CounterPoint
Dim Const		$ExportSKUs				= "\\Hmsvr1\cpsql.1\Toplevel\HMS\Configuration\ItemImages\CSV\SKUS.csv"													;name/location of grid item info export from CounterPoint
Dim Const		$ExportRules			= "\\Hmsvr1\cpsql.1\Toplevel\HMS\Configuration\ItemImages\CSV\RULES.csv"												;name/location of Rules File to be Exported

	#region SQL_Products Base Item Data Export
	$SQL_SelectPlus =	"DECLARE @url VARCHAR(500)"& @CRLF & _
						"SET @url = 'http://75.151.232.37:5483/'"& @CRLF & _
						"DECLARE @sep VARCHAR(1)"& @CRLF & _
                        "SET @sep = '^'"& @CRLF & _
                        ""& @CRLF & _
						"SELECT NULL AS 'Product ID',"& @CRLF & _
                        "'PRODUCT' AS 'Item Type',"& @CRLF & _
                        "'P' AS 'Product Type',"& @CRLF & _
                        "IM_ITEM.ITEM_NO + '|**' AS 'Product Code/SKU',"& @CRLF & _
                        "IM_ITEM.ADDL_DESCR_1 AS 'Product Name',"& @CRLF & _
                        "IM_INV.BIN_1 AS 'Bin Picking Number',"& @CRLF & _
                        "IM_ITEM.PROF_ALPHA_2 AS 'Brand Name',"& @CRLF & _
                        "IM_ITEM.ITEM_NO + ' / ' + IM_ITEM.DIM_COD_LABEL AS 'Option Set',"& @CRLF & _
						"NULL AS 'Option Set Align',"& @CRLF & _
                        "EC_ITEM_DESCR.HTML_DESCR AS 'Product Description',"& @CRLF & _
                        "CASE"& @CRLF & _
                        "WHEN IM_ITEM_NOTE.NOTE_ID = 'METAKEY'"& @CRLF & _
                        "THEN"& @CRLF & _
                        "IM_ITEM_NOTE.NOTE"& @CRLF & _
                        "ELSE NULL"& @CRLF & _
                        "END AS 'Search Keywords',"& @CRLF & _
                        "CASE"& @CRLF & _
                        "WHEN IM_ITEM_NOTE.NOTE_ID = 'METAKEY'"& @CRLF & _
                        "THEN"& @CRLF & _
                        "IM_ITEM_NOTE.NOTE"& @CRLF & _
                        "ELSE NULL"& @CRLF & _
                        "END AS 'Meta Keywords',"& @CRLF & _
                        "IM_ITEM.PRC_1 AS 'Price',"& @CRLF & _
                        "IM_ITEM.LST_COST AS 'Cost Price',"& @CRLF & _
                        "IM_ITEM.REG_PRC AS 'Retail Price',"& @CRLF & _
                        "IM_ITEM.PRC_1 AS 'Sale Price',"& @CRLF & _
                        "CASE"& @CRLF & _
                        "WHEN IM_ITEM.WEIGHT > 199 THEN '999'"& @CRLF & _
                        "WHEN IM_ITEM.WEIGHT < 199 AND IM_ITEM.WEIGHT > 30"& @CRLF & _
                        "OR IM_ITEM.PROF_ALPHA_2 = 'Yakima' AND IM_ITEM.WEIGHT > 5 THEN '50'"& @CRLF & _
                        "ELSE NULL END AS 'Fixed Shipping Cost',"&@CRLF & _
						"CASE"& @CRLF & _
                        "WHEN IM_ITEM.WEIGHT < 199 AND IM_ITEM.WEIGHT > 30"& @CRLF & _
                        "OR IM_ITEM.PROF_ALPHA_2 = 'Yakima' AND IM_ITEM.WEIGHT > 5 THEN 'N'"& @CRLF & _
                        "WHEN IM_ITEM.PRC_1 > 49.99 AND IM_ITEM.WEIGHT < 30 THEN 'Y'"& @CRLF & _
                        "WHEN IM_ITEM.PRC_1 < 49.99 AND IM_ITEM.WEIGHT < 1 THEN 'Y'"& @CRLF & _
                        "ELSE 'N' END AS 'Free Shipping',"& @CRLF & _
                        "IM_ITEM.WEIGHT AS 'Product Weight',"& @CRLF & _
						"IM_ITEM.PROF_NO_2 AS 'Product Width',"& @CRLF & _
                        "IM_ITEM.PROF_NO_1 AS 'Product Height',"& @CRLF & _
                        "IM_ITEM.PROF_NO_3 AS 'Product Depth',"& @CRLF & _
                        "REPLACE(IM_ITEM.USR_DISABLE_PURCHASE, 'N','Y') AS 'Allow Purchases?',"& @CRLF & _
                        "'Y' AS 'Product Visible?',"& @CRLF & _
						"CASE"& @CRLF & _
                        "WHEN IM_ITEM.WEIGHT < 199 AND IM_ITEM.WEIGHT > 30"& @CRLF & _
                        "OR IM_ITEM.PROF_ALPHA_2 = 'Yakima' AND IM_ITEM.WEIGHT > 5"& @CRLF & _
                        "THEN 'This item does not qualify for free shipping.'"& @CRLF & _
                        "WHEN IM_ITEM.WEIGHT > 199 THEN 'In Store Pickup Only'"& @CRLF & _
                        "WHEN IM_ITEM.WEIGHT < 30 AND IM_ITEM.PROF_ALPHA_2 != 'Yakima'"& @CRLF & _
                        "THEN 'Usually Ships Within 24 Hours'"& @CRLF & _
                        "ELSE 'Usually Ships Within 24 Hours' END AS 'Product Availability',"& @CRLF & _
                        "CASE WHEN IM_ITEM.TRK_METH = 'G'"& @CRLF & _
                        "THEN 'by option' ELSE 'by product'"& @CRLF & _
                        "END AS 'Track Inventory?',"& @CRLF & _
						"IM_INV.QTY_AVAIL AS 'Current Stock Level',"& @CRLF & _
                        "IM_ITEM.USR_QTY_STOCK_THRESHOLD AS 'Low Stock Level',"& @CRLF & _
                        "VI_EC_CATEG_TREE.PATH AS 'Category',"& @CRLF & _
                        "NULL AS 'Product File - 1',"& @CRLF & _
                        "NULL AS 'Product File Description - 1',"& @CRLF & _
                        "NULL AS 'Product File Max Downloads - 1',"& @CRLF & _
                        "NULL AS 'Product File Expires After - 1',"& @CRLF & _
                        "LOWER(@url + IM_ITEM.ITEM_NO + '.JPG') AS 'Product Image File - 1',"& @CRLF & _
						"LOWER(@url + IM_ITEM.ITEM_NO + @sep + '1.JPG') AS 'Product Image File - 2',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 3',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 4',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 5',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 6',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 7',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 8',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 9',"& @CRLF & _
						"'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 10',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 11',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 12',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 13',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 14',"& @CRLF & _
                        "'=INDIRECT(ADDRESS(ROW(),COLUMN()-1))' AS 'Product Image File - 15',"& @CRLF & _
                        "IM_ITEM.ADDL_DESCR_1 AS 'Product Image Description - 1',"& @CRLF & _
                        "'Y' AS 'Product Image Is Thumbnail - 1',"& @CRLF & _
                        "0 AS 'Product Image Sort - 1',"& @CRLF & _
						"IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 1' AS 'Product Image Description - 2',"& @CRLF & _
                        "1 AS 'Product Image Sort - 2',"& @CRLF & _
                        "IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 2' AS 'Product Image Description - 3',"& @CRLF & _
                        "2 AS 'Product Image Sort - 3',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 3' AS 'Product Image Description - 4',3 AS 'Product Image Sort - 4',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 4' AS 'Product Image Description - 5',4 AS 'Product Image Sort - 5',"& @CRLF & _
						"IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 5' AS 'Product Image Description - 6'"& @CRLF & _
                        ",5 AS 'Product Image Sort - 6',"& @CRLF & _
                        "IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 6' AS 'Product Image Description - 7',"& @CRLF & _
                        "6 AS 'Product Image Sort - 7',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 7' AS 'Product Image Description - 8',7 AS 'Product Image Sort - 8',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 8' AS 'Product Image Description - 9',8 AS 'Product Image Sort - 9',"& @CRLF & _
						"IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 9' AS 'Product Image Description - 10',"& @CRLF & _
                        "9 AS 'Product Image Sort - 10',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 10' AS 'Product Image Description - 11',10 AS 'Product Image Sort - 11',IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 11' AS 'Product Image Description - 12',11 AS 'Product Image Sort - 12',"& @CRLF & _
                        "IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 12' AS 'Product Image Description - 13',"& @CRLF & _
                        "12 AS 'Product Image Sort - 13',"& @CRLF & _
						"IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 13' AS 'Product Image Description - 14',"& @CRLF & _
                        "13 AS 'Product Image Sort - 14',"& @CRLF & _
                        "IM_ITEM.ADDL_DESCR_1 + ' Alternate Image 14' AS 'Product Image Description - 15',"& @CRLF & _
                        "14 AS 'Product Image Sort - 15',"& @CRLF & _
                        "IM_ITEM.USR_META_TITLE AS 'Page Title',"& @CRLF & _
                        "IM_ITEM.USR_META_DESCR AS 'Meta Description',"& @CRLF & _
                        "NULL AS 'MYOB Asset Acct',"& @CRLF & _
                        "NULL AS 'MYOB Income Acct',"& @CRLF & _
                        "NULL AS 'MYOB Expense Acct',"& @CRLF & _
                        "IM_ITEM.PROF_COD_3 AS 'Product Condition',"& @CRLF & _
						"'Y' AS 'Show Product Condition?',"& @CRLF & _
                        "NULL AS 'Sort Order',"& @CRLF & _
                        "NULL AS 'Product Tax Class',"& @CRLF & _
                        "IM_ITEM.PROF_ALPHA_1 AS 'Product UPC/EAN',"& @CRLF & _
                        "NULL AS 'Stop Processing Rules',"& @CRLF & _
                        "NULL AS 'Product URL',"& @CRLF & _
                        "'Y' AS 'Redirect Old URL?',"& @CRLF & _
                        "IM_ITEM.PROF_ALPHA_1 AS 'GPS Global Trade Item Number',"& @CRLF & _
                        "IM_ITEM.PROF_ALPHA_3 AS 'GPS Manufacturer Part Number',"& @CRLF & _
                        "IM_ITEM.PROF_COD_5 AS 'GPS Gender',"& @CRLF & _
						"IM_ITEM.PROF_COD_4 AS 'GPS Age Group',"& @CRLF & _
                        "IM_ITEM.USR_COLOR AS 'GPS Color',"& @CRLF & _
                        "IM_ITEM.USR_SIZE AS 'GPS Size',"& @CRLF & _
                        "NULL AS 'GPS Material',"& @CRLF & _
                        "NULL AS 'GPS Pattern',"& @CRLF & _
                        "NULL AS 'GPS Item Group ID',"& @CRLF & _
                        "VI_EC_CATEG_TREE.PATH  AS 'GPS Category',"& @CRLF & _
                        "IM_ITEM.USR_GOOGLE_SHOPPING_FEED AS 'GPS Enabled',"& @CRLF & _
                        "NULL AS 'Avalara Product Tax Code',"& @CRLF & _
						"CASE"& @CRLF & _
                        "WHEN IM_ITEM.PROF_ALPHA_4 = 'ORM-D'"& @CRLF & _
                        "THEN 'ORMD=This item must ship via ground method.'"& @CRLF & _
                        "WHEN IM_ITEM.PROF_ALPHA_4 = 'Prop65'"& @CRLF & _
                        "THEN 'Prop 65=California customers, this item is a Propositon 65 Item.'"& @CRLF & _
                        "WHEN IM_ITEM.PROF_ALPHA_4 = 'Prop65 ORM-D'"& @CRLF & _
                        "THEN 'Prop 65=California customers, this item is a Propositon 65 Item.;ORMD=This item must ship via ground method.'"& @CRLF & _
                        "WHEN IM_ITEM.PROF_ALPHA_4 = 'SwimSuit'"& @CRLF & _
                        "THEN 'Returns=No returns on swimwear items.'"& @CRLF & _
                        "WHEN IM_ITEM.PROF_ALPHA_4 = 'Prop65 SwimSuit'"& @CRLF & _
                        "THEN 'Prop 65=California customers, this item is a Propositon 65 Item.;Returns=No returns on swimwear items.'"& @CRLF & _
						"ELSE '' END AS 'Product Custom Fields'"& @CRLF & _
                        "FROM IM_ITEM"& @CRLF & _
						"JOIN EC_ITEM_DESCR ON IM_ITEM.ITEM_NO = EC_ITEM_DESCR.ITEM_NO"& @CRLF & _
						"JOIN EC_CATEG_ITEM ON IM_ITEM.ITEM_NO = EC_CATEG_ITEM.ITEM_NO"& @CRLF & _
						"JOIN VI_EC_CATEG_TREE ON EC_CATEG_ITEM.CATEG_ID = VI_EC_CATEG_TREE.CATEG_ID"& @CRLF & _
						"JOIN EC_CATEG ON EC_CATEG.CATEG_ID = EC_CATEG_ITEM.CATEG_ID"& @CRLF & _
						"JOIN IM_INV ON IM_INV.ITEM_NO = IM_ITEM.ITEM_NO"& @CRLF & _
						"JOIN IM_ITEM_NOTE ON IM_ITEM.ITEM_NO = IM_ITEM_NOTE.ITEM_NO"& @CRLF & _
						"WHERE"
						
	$SQL_WherePre = "IM_ITEM_NOTE.NOTE_ID = 'METAKEY' AND IM_INV.LOC_ID = 'MAIN' AND VI_EC_CATEG_TREE.LVL1 != 'Promotions' AND VI_EC_CATEG_TREE.CATEG_ID = EC_CATEG_ITEM.CATEG_ID"& @CRLF & _
					"AND IM_ITEM.ITEM_NO = '"
	$SQL_WherePost = "'"
	$SQL_Post =     "ORDER BY IM_ITEM.ITEM_NO"
	#endregion SQL_Products

	#region SQL_SKUs Variant Information
	$SQL_SelectPlus2 =	"DECLARE @url VARCHAR(500)"& @CRLF & _
						"SET @url = 'http://75.151.232.37:5483/'"& @CRLF & _
						"DECLARE @sep VARCHAR(1)"& @CRLF & _
						"SET @sep = '^';"& @CRLF & _
                        ""& @CRLF & _
						"SELECT NULL AS 'Product ID',"& @CRLF & _
                        "'SKU' AS 'Item Type',"& @CRLF & _
                        "NULL AS 'Product Type',"& @CRLF & _
                        "CASE"& @CRLF & _
                        "WHEN IM_INV_CELL.DIM_3_UPR = '*'"& @CRLF & _
                        "THEN IM_ITEM.ITEM_NO + '|*|*' + IM_INV_CELL.DIM_1_UPR + '|' + IM_INV_CELL.DIM_2_UPR"& @CRLF & _
						"ELSE REPLACE(IM_ITEM.ITEM_NO + '|*|*' + IM_INV_CELL.DIM_1_UPR + '|' + IM_INV_CELL.DIM_2_UPR + '|' + IM_INV_CELL.DIM_3_UPR, '|*|*','|*')"& @CRLF & _
                        "END AS 'Product Code/SKU',"& @CRLF & _
						"CASE"& @CRLF & _
                        "WHEN IM_ITEM.GRID_DIM_3_TAG <> '' AND IM_ITEM.GRID_DIM_3_TAG IS NOT NULL"& @CRLF & _
                        "THEN  '[RT]' + IM_ITEM.GRID_DIM_1_TAG + '=' + IM_BARCOD.DIM_1_UPR + ',[S]' + IM_ITEM.GRID_DIM_2_TAG + '=' + IM_BARCOD.DIM_2_UPR+ ',[RB]' + IM_ITEM.GRID_DIM_3_TAG + '=' + IM_BARCOD.DIM_3_UPR"& @CRLF & _
						"WHEN IM_ITEM.GRID_DIM_2_TAG <> '' AND IM_ITEM.GRID_DIM_2_TAG IS NOT NULL"& @CRLF & _
                        "THEN '[RT]' + IM_ITEM.GRID_DIM_1_TAG + '=' + IM_BARCOD.DIM_1_UPR + ',[S]' + IM_ITEM.GRID_DIM_2_TAG + '=' + IM_BARCOD.DIM_2_UPR"& @CRLF & _
						"ELSE  '[RT]' + IM_ITEM.GRID_DIM_1_TAG + '=' + IM_BARCOD.DIM_1_UPR"& @CRLF & _
                        "END AS 'Product Name',"& @CRLF & _
                        "NULL AS 'Bin Picking Number',"& @CRLF & _
                        "NULL AS 'Brand Name',"& @CRLF & _
                        "NULL AS 'Option Set',"& @CRLF & _
                        "NULL AS 'Option Set Align',"& @CRLF & _
                        "NULL AS 'Product Description,"& @CRLF & _
                        "NULL AS 'Search Keywords',"& @CRLF & _
                        "NULL AS 'Meta Keywords',"& @CRLF & _
                        "IM_ITEM.PRC_1 AS 'Price',"& @CRLF & _
                        "IM_ITEM.LST_COST AS 'Cost Price',"& @CRLF & _
                        "IM_ITEM.REG_PRC AS 'Retail Price',"& @CRLF & _
                        "IM_ITEM.PRC_1 AS 'Sale Price',"& @CRLF & _
                        "NULL AS 'Fixed Shipping Cost',"& @CRLF & _
                        "NULL AS 'Free Shipping',"& @CRLF & _
                        "IM_ITEM.WEIGHT as 'Product Weight,"& @CRLF & _
                        "IM_ITEM.PROF_NO_2 AS 'Product Width',"& @CRLF & _
                        "IM_ITEM.PROF_NO_1 AS 'Product Height,"& @CRLF & _
                        "IM_ITEM.PROF_NO_3 AS 'Product Depth',"& @CRLF & _
                        "NULL AS 'Allow Purchases',"& @CRLF & _
                        "NULL AS 'Product Visible?',"& @CRLF & _
                        "NULL AS 'Product Availability,"& @CRLF & _
                        "NULL AS 'Track Inventory',"& @CRLF & _
                        "IM_INV_CELL.QTY_AVAIL AS 'Current Stock Level',"& @CRLF & _
                        "NULL AS 'Low Stock Level',"& @CRLF & _
                        "NULL AS 'Category',"& @CRLF & _
                        "NULL AS 'Product File - 1,"& @CRLF & _
                        "NULL AS 'Product File Description - 1',"& @CRLF & _
                        "NULL AS 'Product File Expires After - 1',"& @CRLF & _
						"CASE"& @CRLF & _
                        "WHEN IM_ITEM.DIM_COD_LABEL = 'Size'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
						"WHEN IM_ITEM.DIM_COD_LABEL = 'Color'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + @sep + IM_INV_CELL.DIM_1_UPR + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
						"WHEN IM_ITEM.DIM_COD_LABEL = 'Color / Size'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + @sep + IM_INV_CELL.DIM_1_UPR + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
						"WHEN IM_ITEM.DIM_COD_LABEL = 'Size / Color'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + @sep + IM_INV_CELL.DIM_2_UPR + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
						"WHEN IM_ITEM.DIM_COD_LABEL = 'Lock no'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
                        "ELSE LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO+ '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
						"END AS 'Product Image File - 1',"& @CRLF & _
                        "NULL AS 'Product Image File - 2',"& @CRLF & _
                        "NULL AS 'Product Image File - 3',"& @CRLF & _
                        "NULL AS 'Product Image File - 4',"& @CRLF & _
                        "NULL AS 'Product Image File - 5',"& @CRLF & _
                        "NULL AS 'Product Image File - 6',"& @CRLF & _
                        "NULL AS 'Product Image File - 7',"& @CRLF & _
                        "NULL AS 'Product Image File - 8',"& @CRLF & _
                        "NULL AS 'Product Image File - 9',"& @CRLF & _
                        "NULL AS 'Product Image File - 10',"& @CRLF & _
                        "NULL AS 'Product Image File - 11',"& @CRLF & _
                        "NULL AS 'Product Image File - 12',"& @CRLF & _
                        "NULL AS 'Product Image File - 13',"& @CRLF & _
                        "NULL AS 'Product Image File - 14',"& @CRLF & _
                        "NULL AS 'Product Image File - 15',"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
						"NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "CASE"& @CRLF & _
                        "WHEN IM_BARCOD.BARCOD_ID = 'UPC'"& @CRLF & _
                        "THEN IM_BARCOD.BARCOD"& @CRLF & _
                        "ELSE IM_ITEM.PROF_ALPHA_1"& @CRLF & _
                        "END,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "IM_ITEM.PROF_ALPHA_1,"& @CRLF & _
                        "IM_ITEM.PROF_ALPHA_3,"& @CRLF & _
                        "IM_ITEM.PROF_COD_5,"& @CRLF & _
                        "IM_ITEM.PROF_COD_4,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL"& @CRLF & _
                        "FROM IM_BARCOD"& @CRLF & _
						"JOIN IM_ITEM ON IM_ITEM.ITEM_NO = IM_BARCOD.ITEM_NO"& @CRLF & _
						"JOIN IM_ITEM_NOTE ON IM_ITEM_NOTE.ITEM_NO = IM_BARCOD.ITEM_NO"& @CRLF & _
						"JOIN IM_INV_CELL ON IM_INV_CELL.ITEM_NO = IM_BARCOD.ITEM_NO"& @CRLF & _
						"JOIN EC_ITEM_DESCR ON EC_ITEM_DESCR.ITEM_NO = IM_BARCOD.ITEM_NO"& @CRLF & _
                        "WHERE"

	#EndRegion SQL_SKUs

        #region SQL_Rules Variant Images
    $SQL_SelectPlus3 =  "DECLARE @url VARCHAR(500)"& @CRLF & _
                        "SET @url = 'http://75.151.232.37:5483/'"& @CRLF & _
                        "DECLARE @sep VARCHAR(1)"& @CRLF & _
                        "SET @sep = '^';"& @CRLF & _
                        ""& @CRLF & _
                        "SELECT"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "'RULE' AS 'Item Type',"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "CASE "& @CRLF & _
                        "WHEN IM_INV_CELL.DIM_3_UPR = '*'"& @CRLF & _
                        "THEN IM_ITEM.ITEM_NO + '|' + IM_INV_CELL.DIM_1_UPR + '|' + IM_INV_CELL.DIM_2_UPR"& @CRLF & _
                        "ELSE"& @CRLF & _
                        "REPLACE(IM_ITEM.ITEM_NO + '|' + IM_INV_CELL.DIM_1_UPR + '|' + IM_INV_CELL.DIM_2_UPR + '|' + IM_INV_CELL.DIM_3_UPR, '|*|*','|*')"& @CRLF & _
                        "END AS 'Product Code/SKU',"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "'Y' AS 'Allow Purchases?',"& @CRLF & _
                        "'Y' AS 'Product Visible?',"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "CASE"& @CRLF & _
                        "WHEN IM_ITEM.DIM_COD_LABEL = 'Size'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
                        "WHEN IM_ITEM.DIM_COD_LABEL = 'Color'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + @sep + IM_INV_CELL.DIM_1_UPR + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
                        "WHEN IM_ITEM.DIM_COD_LABEL = 'Color / Size'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + @sep + IM_INV_CELL.DIM_1_UPR + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
                        "WHEN IM_ITEM.DIM_COD_LABEL = 'Size / Color'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + @sep + IM_INV_CELL.DIM_2_UPR + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
                        "WHEN IM_ITEM.DIM_COD_LABEL = 'Lock no'"& @CRLF & _
                        "THEN LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO + '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
                        "ELSE LOWER(@url + REPLACE (REPLACE(REPLACE((IM_ITEM.ITEM_NO+ '.JPG'),'^*',''),'/','-'),' ',''))"& @CRLF & _
                        "END,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "IM_ITEM.ADDL_DESCR_1 AS 'Product Image Description - 1',"& @CRLF & _
                        "'N' AS 'Product Image Is Thumbnail - 1',"& @CRLF & _
                        "0 AS 'Product Image Sort - 1',"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "'N',"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL,"& @CRLF & _
                        "NULL"& @CRLF & _
                        "FROM IM_BARCOD"& @CRLF & _
                        "JOIN IM_ITEM ON IM_ITEM.ITEM_NO = IM_BARCOD.ITEM_NO"& @CRLF & _
                        "JOIN IM_ITEM_NOTE ON IM_ITEM_NOTE.ITEM_NO = IM_BARCOD.ITEM_NO"& @CRLF & _
                        "JOIN IM_INV_CELL ON IM_INV_CELL.ITEM_NO = IM_BARCOD.ITEM_NO"& @CRLF & _
                        "JOIN EC_ITEM_DESCR ON EC_ITEM_DESCR.ITEM_NO = IM_BARCOD.ITEM_NO"& @CRLF & _
						"WHERE"
                        
$SQL_WherePre2 =        "IM_BARCOD.BARCOD_ID = 'UPC'"& @CRLF & _
                        "AND IM_ITEM_NOTE.NOTE_ID = 'METAKEY'"& @CRLF & _
                        "AND IM_INV_CELL.LOC_ID = 'MAIN'"& @CRLF & _
                        "AND IM_BARCOD.DIM_1_UPR = IM_INV_CELL.DIM_1_UPR"& @CRLF & _
                        "AND IM_BARCOD.DIM_2_UPR = IM_INV_CELL.DIM_2_UPR"& @CRLF & _
                        "AND IM_BARCOD.DIM_3_UPR = IM_INV_CELL.DIM_3_UPR"& @CRLF & _
                        "AND IM_BARCOD.ITEM_NO = '"
                        $SQL_WherePost2 = "' OR"
                        $SQL_Post2 = "ORDER BY IM_ITEM.ITEM_NO"
                        #endregion SQL 2


#EndRegion
Dim	$SQL_Products,$SQL_SKUs,$SQL3,$items,$EditList,$IDinput;

Dim	$Enter	= Chr(13)&Chr(10);

RunGUI()

Func Run_Program()
	Local $Item_List2
	$r = ReadGUI($Item_List2)
	ProgressOn($Program_Name,"Program Start","0%",0,0)														;Progress Bar
	ProgressSet(8,"8%","Program Started")																	;Progress Bar
	ProgressSet(16,"16%","Launching CounterPoint")															;Progress Bar
	HMS_CP_Login("OVN","Password2");
	Sleep(2500)
	ProgressSet(24,"24%","Successful Login")																;Progress Bar
	Sleep(2500)
	$SQL_Products = HMS_CreateSQL($Item_List2,$SQL_SelectPlus,$SQL_WherePre,$SQL_WherePost,$SQL_Post)		;create SQL statment for standard item information export
	$SQL_SKUs = HMS_CreateSQL($Item_List2,$SQL_SelectPlus2,$SQL_WherePre,$SQL_WherePost,$SQL_Post)			;create SQL statment for standard item information export
	$SQL_Rules = HMS_CreateSQL($Item_List2,$SQL_SelectPlus3,$SQL_WherePre,$SQL_WherePost,$SQL_Post)			;create SQL statment for standard item information export
	ProgressSet(32,"32%","Exporting Products")																;Progress Bar
   #Region CP Export
	HMS_DB_Export($SQL_Products,$ExportProducts,2)															;export products
	ProgressSet(40,"40%","Products Exported")																;Progress Bar
	ProgressSet(48,"48%","Exporting SKUs")																	;Progress Bar
	HMS_DB_Export($SQL_SKUs, $ExportSKUs, 3)																;export skus
	ProgressSet(56,"56%","SKUs Exported")																	;Progress Bar
	ProgressSet(64,"64%","Exporting Rules")																	;Progress Bar
	HMS_DB_Export($SQL_Rules, $ExportRules, 3)																;export rules
	ProgressSet(78,"78%","Rules Exported")																	;Progress Bar

   #EndRegion CP Export
	ProgressSet(84,"84%","Exiting CounterPoint")															;Progress Bar
	HMS_CP_Exit()
	ProgressSet(92,"92%","Generating CSV on Google Sheets")													;Progress Bar
	ShellExecute("chrome.exe","https://script.google.com/macros/s/AKfycbw7XO9fssNqTkDkSE-oXmDJOZ99PMTzyBxcwnC5C4CHt4Kd3cBV/exec");
	Sleep(12500);
	ProgressSet(96,"96%","Launching Google Drive")
	ShellExecute("chrome.exe", "https://drive.google.com/drive/folders/1j1W6ZH_zwoMZ6Gkht5r9L1H67q5cZlhC")
	ProgressSet(100,"100%","Finished!")																		;Progress Bar
	Sleep(1000)
	ProgressOff()
	Exit_Program()
EndFunc


Func RunGUI()
	GUICreate("CP to BigCommerce "&$version,250,500);
	GUICtrlCreateLabel("Enter Item Numbers Below",-1,5,500,20);
	$EditList = GUICtrlCreateEdit("",-1,30,500,400)
	$GObutton = GUICtrlCreateButton("GO!",128,435,100,25)
	$CLOSEbutton = GUICtrlCreateButton("CLOSE",75,470,100,25)
	GUICtrlSetOnEvent($GObutton,"Run_Program")

	GUICtrlSetOnEvent($CLOSEbutton,"Exit_Program")
	GUISetOnEvent($GUI_EVENT_CLOSE,"Exit_Program")

	GUISetState(@sw_show)

	While 1
		Sleep(1000)
	WEnd
EndFunc

Func ReadGUI(ByRef $Item_List)
	$Item_List = GUICtrlRead($EditList)
	$Output_User = GUICtrlRead($IDinput)
	Return $Output_User
EndFunc

Func Exit_Program()
	MsgBox(0,$Program_Name,"Done." & @CRLF & "The items should be ready to be imported to Google Sheets")
	Exit
EndFunc

Func HMS_CreateSQL($Item_List,$SQL_SelectPlus,$SQL_WherePre,$SQL_WherePost,$SQL_Post)
	Local $Item_List_Array,$SQL_Statement

	$Item_List_Array = StringSplit($Item_List,$Enter,1)

	$SQL_Statement = $SQL_SelectPlus & $Enter & $SQL_WherePre & $Item_List_Array[1] & $SQL_WherePost &$Enter
	If $Item_List_Array[0] > 1 Then
		For $i = 2 to $Item_List_Array[0]
			$SQL_Statement = $SQL_Statement &$Enter& "OR " & $SQL_WherePre & $Item_List_Array[$i] & $SQL_WherePost &$Enter
		Next
	EndIf
	$SQL_Statement = $SQL_Statement & $SQL_Post

	Return $SQL_Statement
EndFunc

Func HMS_DB_Export($SQL,$Save = "",$Mode = 1,$delimeter = ",")
   Local $return

	Wait("HIGH MOUNTAIN SPORTS - CounterPoint SQL","")
	Send("9 2")
	Wait("Database Export - ","")

	Switch $Mode
		Case 1 ;use preset parameter
			ControlClick("Database Export - ","&Load parameters","TSBitBtn2","left")		;click to load parameters
			Sleep(1000)
			Wait("Load","")
			Sleep(500)
			ControlSetText("Load","","Edit1",$SQL)											;set the parameter name
			ControlClick("Load","&Load","TSButton3","left")									;click on load button

			Local $whilecount = 0
			While WinExists("Load") = 1
				If $whilecount = 10 Then ExitLoop	;exit loop after giving number of cycles, added to fix an issue on two computers (ebay and ecom2)
				Sleep(500)
				$whilecount = $whilecount + 1
			WEnd

			Wait("Database Export - ","")
			If $Save <> "" Then
				ControlSetText("Database Export - ","","TSButtonEdit2",$Save)				;enter the save to location
			Else
			   $return = ControlGetText("Database Export - ","","TSButtonEdit2")
			EndIf

			ControlClick("Database Export - ","Edit &SQL","TSButton1","left")				;click to edit SQL

			Wait("Edit SQL statement","")
			ControlSetText("Edit SQL statement","","TSMemo1",$SQL)							;set SQL text
			ControlClick("Edit SQL statement","&OK","TSButton3","left")

			Wait("Database Export - ","")
			Send("{altdown}x{altup}")														;click on export

		Case 2 ;use custom SQL query
			Sleep(500)
;~ 			ControlCommand("Database Export - ","&Use SQL Query","TSCheckBox2","Check")		 ;check to use SQL

			WinActivate("Database Export - ")												;activate Export window				;attempting this method to see if the SixBit macro functions more correctly this way.
			Send("{altdown}u{altup}")														;Select the "use SQL" field
			Send("{space}")																	;check/uncheck the "Use SQL" field

			Sleep(1000)																		;wait for the check to take effect, increased time limit on 20140512 to see if this fixes an issue with opening the help file when clicking to edit the SQL.

			ControlClick("Database Export - ","Edit &SQL","TSButton1","left")				;click to edit SQL

			Wait("Edit SQL statement","")
			ControlSetText("Edit SQL statement","","TSMemo1",$SQL)							;set SQL text
			ControlClick("Edit SQL statement","&OK","TSButton3","left")
			ControlSetText("Database Export - ","","TSButtonEdit2",$Save)					;enter the save to location

			ControlFocus("Database Export - ","","TSComboBox3")								;Select delimiter choice
			Send($delimeter&"{tab}")														;enter delimiter Character

			Wait("Database Export - ","")
			ControlClick("Database Export - ","E&xport","TSButton4","left")					;click on export

			Case 3 ;use custom SQL query without headers
			Sleep(500)
			Send("{altdown}w{altup}")
			Send("{altdown}w{altup}")
;~ 			ControlCommand("Database Export - ","&Use SQL Query","TSCheckBox2","Check")		 ;check to use SQL

			WinActivate("Database Export - ")												;activate Export window				;attempting this method to see if the SixBit macro functions more correctly this way.
			Send("{altdown}u{altup}")														;Select the "use SQL" field
			Send("{space}")																	;check/uncheck the "Use SQL" field

			Sleep(1000)																		;wait for the check to take effect, increased time limit on 20140512 to see if this fixes an issue with opening the help file when clicking to edit the SQL.

			ControlClick("Database Export - ","Edit &SQL","TSButton1","left")				;click to edit SQL

			Wait("Edit SQL statement","")
			ControlSetText("Edit SQL statement","","TSMemo1",$SQL)							;set SQL text
			ControlClick("Edit SQL statement","&OK","TSButton3","left")
			ControlSetText("Database Export - ","","TSButtonEdit2",$Save)					;enter the save to location

			ControlFocus("Database Export - ","","TSComboBox3")								;Select delimiter choice
			Send($delimeter&"{tab}")														;enter delimiter Character

			Wait("Database Export - ","")
			ControlClick("Database Export - ","E&xport","TSButton4","left")					;click on export
	EndSwitch
	Sleep(500)
	If WinExists("Confirm","Overwrite existing file of the same name?") then ControlClick("Confirm","Overwrite existing file of the same name?","TButton1","left") ;Overwrite existing file if there is one
	Sleep(2500)
	While WinExists("Database Export -","&Cancel") = 1										;sleep until the export is finished
		If WinExists("Confirm","Overwrite existing file of the same name?") then ControlClick("Confirm","Overwrite existing file of the same name?","TButton1","left") ;Overwrite existing file if there is one
		Sleep(500)
	WEnd

Wait("Database Export - ","")
	Switch $Mode
		Case 1 ;use preset parameter
			Send("{altdown}c{altup}")						;click to close Export
		Case 2 ;use custom SQL query
			Send("{altdown}c{altup}")						;click to close Export
		Case 3 ;use custom SQL query
		Send("{altdown}c{altup}")							;click to close Export
	EndSwitch
	Sleep(2000)
	If WinExists("Confirm","Database export parameters have changed. Do you want to save changes?") Then Send("{altdown}n{altup}") ;Do not save any changes

	Return $return
EndFunc

;Generic Function for waiting for a window to load and making it the active window
Func Wait($WindowName,$WindowText = "")
	WinWait($WindowName,$WindowText)
	if not WinActive($WindowName,$WindowText) then WinActivate($WindowName,$WindowText)
	WinWaitActive($WindowName,$WindowText)
	Sleep(400)
EndFunc

Func HMS_CP_Login($User,$Password)
   Switch @CPUArch
	  Case "X86"
		 Run("C:\Program Files\Radiant Systems\CounterPoint\CPSQL.1 - Station\Bin\CounterPoint.exe")
	  Case "X64"
		 Run("C:\Program Files (x86)\Radiant Systems\CounterPoint\CPSQL.1 - Station\Bin\CounterPoint.exe")
	  Case Else
		 Return "Windows architecture not found"
   EndSwitch

	Sleep(3000)

	WinWait("Select a Company","",1500)
	if not WinActive("Select a Company") then WinActivate("Select a Company")
	WinWaitActive("Select a Company")
	Send("{enter}")

	Wait("Login - HIGH MOUNTAIN SPORTS","")
	Send("+{TAB}" & $User & "{TAB}" & $Password & "{ENTER}")
	Sleep(2500)
	if WinExists("HIGH MOUNTAIN SPORTS - CounterPoint SQL") Then
		Return "Succesful"
	Else
		Sleep(40000) ;catch maximum users
	EndIf

	if WinExists("Error","Maximum number of users exceeded") Then
		Return "Maximum user error"
		Exit
	EndIf
	Return "Succesful"
EndFunc

Func HMS_CP_Exit()
	Wait("HIGH MOUNTAIN SPORTS - CounterPoint SQL","")
	Send("{altdown}x{altup}")
	Wait("Confirm","")
	Send("{altdown}y{altup}")
	Sleep(1000)
	Return WinExists("HIGH MOUNTAIN SPORTS - CounterPoint SQL")
EndFunc