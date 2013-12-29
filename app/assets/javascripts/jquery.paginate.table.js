(function($){$.fn.paginateTable=function(options){var settings=jQuery.extend({rowsPerPage:5,nextPage:".nextPage",prevPage:".prevPage",firstPage:".firstPage",lastPage:".lastPage",currentPage:".currentPage",totalPages:".totalPages",pageNumbers:".pageNumbers",maxPageNumbers:0,currentPageClass:"current",pager:".paginator",autoHidePager:true},options||{});return this.each(function(){var table=$(this);var pager=$(settings.pager);var nextPage=pager.find(settings.nextPage);var prevPage=pager.find(settings.prevPage);var currentPage=pager.find(settings.currentPage).first();if(currentPage.size()>0){currentPage.text('1');}
else{pager.append('<span style="display:none" class="'+ settings.currentPage.substr(1)+'" >1</span>');currentPage=pager.find(settings.currentPage).first();}
var firstPage=pager.find(settings.firstPage);var lastPage=pager.find(settings.lastPage);nextPage.unbind('click');nextPage.click(function(){var pageNum=getCurrentPage(currentPage.text());displayPage(table,pageNum+1,settings);return false;});prevPage.unbind('click');prevPage.click(function(){var pageNum=getCurrentPage(currentPage.text());displayPage(table,pageNum-1,settings);return false;});firstPage.unbind('click');firstPage.click(function(){displayPage(table,1,settings);return false;});lastPage.unbind('click');lastPage.click(function(){var rows=table.find("tbody tr");var totalPages=Math.ceil(rows.size()/settings.rowsPerPage);displayPage(table,totalPages,settings);return false;});displayPage(table,getCurrentPage(currentPage.text()),settings);});};function getCurrentPage(pageText){var pageNum=parseInt(pageText,10);if(isNaN(pageNum)){pageNum=0;}
return Math.max(1,pageNum);}
function firstVisiblePageNumber(pageNum,totalPages,settings){var p=pageNum- Math.floor(settings.maxPageNumbers/2);if(p<=1)
return 1;return Math.min(p,totalPages- settings.maxPageNumbers);}
function lastVisiblePageNumber(pageNum,totalPages,settings){var p=pageNum+ Math.floor(settings.maxPageNumbers/2);if(p>=totalPages)
return totalPages;return Math.max(p,1+settings.maxPageNumbers);}
function displayPage(table,pageNum,settings){pageNum=Math.max(1,pageNum);if(settings.rowsPerPage>0){var rows=table.find("tbody tr");var totalPages=Math.ceil(rows.size()/settings.rowsPerPage);if(settings.autoHidePager&&totalPages<=1){$(settings.pager).hide();}
else if(totalPages>0){pageNum=Math.min(pageNum,totalPages);var rowStartIndex=(pageNum- 1)*settings.rowsPerPage;var rowEndIndex=pageNum*settings.rowsPerPage;$.each(rows,function(index,row){if(index>=rowStartIndex&&index<rowEndIndex){$(row).show();}
else{$(row).hide();}});var pager=$(settings.pager);pager.find(settings.currentPage).text(pageNum);pager.find(settings.totalPages).text(totalPages);var pageNumbers=pager.find(settings.pageNumbers);if(pageNumbers.size()>0){pageNumbers.empty();var current;var firstVisible=firstVisiblePageNumber(pageNum,totalPages,settings);var lastVisible=lastVisiblePageNumber(pageNum,totalPages,settings);for(var i=firstVisible;i<=lastVisible;i++){current=(pageNum==i)?settings.currentPageClass:'';pageNumbers.append("<a href='#' id='"+ i+"' class='"+ current+"'>"+ i+"</a>");}
pageNumbers.children('a').click(function(){displayPage(table,$(this).attr("id"),settings);return false;});}
var currentPage=pager.find(settings.currentPage);var totalPages=pager.find(settings.totalPages);var prevPage=pager.find(settings.prevPage);var nextPage=pager.find(settings.nextPage);prevPage.show();nextPage.show();if(currentPage.text()==1){prevPage.hide();}
else if(currentPage.text()==totalPages.text()){nextPage.hide();}}}}})(jQuery);