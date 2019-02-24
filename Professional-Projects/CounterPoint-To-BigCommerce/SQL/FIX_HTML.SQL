  SELECT TOP 25

  REPLACE(CAST(HTML_DESCR AS varchar(MAX)), 'p', 'para'), --Works
  REPLACE(CAST(HTML_DESCR AS varchar(MAX)), '\\3E', '<') -- Does not

  FROM EC_ITEM_DESCR
