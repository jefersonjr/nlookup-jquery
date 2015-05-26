/* 
	nLookup jquery Plugin
	Created by: Jeferson Junior
	Last modified: 2015-05-26
*/

(function($) {
    $.fn.nLookup = function(options) {
        var strCol = "";
        var dtCol = [];

        // Default params
        var params = $.extend({
            url: '',
            columns: [],
            onSelect: function() {}
        }, options);

        // Create column list
        if(params.columns != undefined) {
            $.each(params.columns, function(key, value) {
                // Grid header
                strCol = strCol + '<th>' + value.label + '</th>';

                // Grid columns
                dtCol.push({'data' : value.field });
            });

            // Add 'select' column
            strCol = strCol + '<th>#</th>';
            dtCol.push({'data': 'id'});
        }
		
        function get_columns() {
            return strCol;
        }

        $.magnificPopup.open({
            items: {
                src: '<div class="popup-basic bg-none mfp-with-anim"><div class="panel">' +
                '<div class="panel-heading"><span class="panel-title">Select record</span></div>' +
                '<div class="panel-body"><table class="table table-striped table-hover datatable" id="nlookup_search">' +
                '<thead>' + get_columns() + '</thead><tbody></tbody></table>' +
                '<div class="panel-footer text-right"><button class="btn btn-primary" onclick="$.magnificPopup.instance.close();">Close</button>' +
                '</div></div></div>',
                type: 'inline'
            },
            callbacks: {
                open: function () {
                    $('#nlookup_search').dataTable({
                        "ajax": {
                            "url": params.url,
                            "dataSrc": ""
                        },
                        "columns": dtCol,
                        "columnDefs": [
                            {
                                "render": function (data, type, row) {

                                    $("#" + data).on('click', function(){
                                        params.onSelect(row);
                                        $.magnificPopup.instance.close();
                                    });
                                    return '<a id="' + data + '" href="javascript:void()" onclick="" class="btn btn-xs btn-info btn-selecionar">Select</a>';
                                },
                                "targets": dtCol.length - 1
                            }]
                    });
                }
            }
        });
    };
}(jQuery));
