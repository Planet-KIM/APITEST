// annotate color and text in g typo
function hexamer_data(data, column, width, height){
    var axes = '<g class="hexamer-axes" transform="translate(30,0)">';
    /*axes += '<clipPath id="fig_clip" class="hexamer-clip">' +
                '<rect x="0" y="0" width="' + width +'" height="' + height  + '"></rect>'+
            '</clipPath>'+*/
    //axes += '<rect class="hexamer-axesbg" width="' + width + '" height="'+ height + '"></rect>'
    //axes += '<g x="0" y="0" class="hexamer-paths-container" width="' + width + '" height="' + height + '">';
    //'<g class="hexamer-paths">';
    
    // x는 2에서 12씩 계속 더하면 끝 | y는 반복
    var x = 2;
    var y = 0;
    let y_list = [146, 131, 116, 101, 86, 71];
    //for(var i=0 ; i<columns.length ; i++){ // all plot hexamer graph in svg
        //var each_data =  data[columns[i]];
    var each_data = data[column];
    //console.log(each_data);
	//console.log(column);
    for(j=0; j<each_data.length; j++){
        var seq = each_data[j]['seq'];
        //console.log(seq);
		var score = each_data[j]['score']; // not yet(scoring)
        var rgb = each_data[j]['rgb'];
        axes += '<text class="hexamer-text tooltip" textLength="40"' +' title="' +  score  + '" x="' + x + '" y="' + y_list[y] + '" style="' + rgb + '">' + seq;
        //axes += '<tspan class="tooltip" x="' + x +'" y="' + (y_list[y]+10) + '">'+ score + '</tspan>'    
        axes += '</text>';
        x+=6.5; y+=1;
        if(y==6){ y=0; }
    }
    //}
    axes += '</g>';//</g></g>';
    //'<g class="hexamer-staticpaths"></g></g>';
    //console.log(axes);
    return axes;   
}

function hexmaer_xtick(width, g_translate_x){
    // x ticks
    var x_tick = '<g transform="translate(30,' + g_translate_x  + ')" class="hexamer-xaxis" fill="none" text-anchor="middle">'+ 
                    '<path class="domain" stroke="currentColor" d="M0.5,6V0.5H' + width + 'V6"></path>'+ 
                    '<g class="tick"  transform="translate(0.5,0)">' + 
                        '<line stroke="currentColor" y2="6"></line>' + 
                        '<text fill="currentColor" y="9" dy="0.71em">' +
                            '<tspan x="0" y="9" dy="12">0</tspan>' + 
                        '</text>' + 
                    '</g>';
    var x_value = 10;
    for(var translate_x=66; translate_x<width; translate_x+=66){ 
        x_tick += '<g class="tick"  transform="translate(' + translate_x + ',0)">' +
                    '<line stroke="currentColor" y2="6"></line>'+
                    '<text fill="currentColor" y="9" dy="0.71em">'+
                        '<tspan x="0" y="9" dy="12">' + x_value + '</tspan>' +
                    '</text>' +
                   '</g>';
        x_value+=10;
    }
    x_tick+='</g>';
    x_tick += '<g transform="translate(30, 50)" class="hexamaer-xaxis" fill="none" text-anchor="middle">'+
                '<path class="domain" stroke="currentColor" d="M0.5,6V0.5H' + width + 'V6"></path></g>' 
    return x_tick;
}

function hexamer_ytick(width, height, g_translate_y){
    // y ticks
    var y_tick = '<g transform="translate(30,' + g_translate_y + ')" class="hexamer-yaxis" fill="none" text-anchor="end">' + 
                    '<path class="domain" stroke="currentColor" d="M-4 ,' + height + 'H0.5V0.5H-6"></path>';
    
    let y_tick_translate = [100, 70, 40, 10];
    let y_value = [0.0, 2.0, 4.0, 6.0]; 
    for(var y_translate=0 ; y_translate<y_tick_translate.length ; y_translate++){
        y_tick += '<g class="tick" transform="translate(0,' + y_tick_translate[y_translate] + ')">' +
                    '<line stroke="currentColor" x2="-6"></line>' +
                    '<text fill="currentColor" x="-9" dy="0.32em">' + y_value[y_translate] +'</text>' +
                  '</g>';
    }
    // title (x,y) - user select ?
    y_tick += '</g>';
    y_tick += '<g transform="translate('+ (width+29.5) + ',' + g_translate_y + ')" class="hexamer-yaxis" fill="none" text-anchor="end">' + 
                    '<path class="domain" stroke="currentColor" d="M-4 ,' + height + 'H0.5V0.5H-6"></path></g>';
    return y_tick;
}

function hexamer_title(column){
    var title = '<text class="hexamer-title-top" x="400" y="45">Hexamer score('+ column +')</text>'; 
    //'<text class="hexamer-title-left" x="-48.30555555555553" y="180" transform="rotate(-90,-48.30555555555553,117.174)">' + column + '</text>' 
                //'<text class="hexamer-title-top" x="400" y="50">Hexamer score</text>';
    return title;
}

function hexamer_figure(data, id, hexamerid, seq_len){
	let origin_hexamerid = hexamerid.replace('#', '')
    console.log(data); 
    // rebatch size
    let width = ((seq_len * 12.5) / 2)+50;
    let height = 150 - 50;

    // rebatch columns
    let columns = ["5p_exon", "5p_intron", "3p_exon", "3p_intron"];
    //let hexamer_figure_width = (width + 100);
    //let hexamer_figure_height = (height + 100);
    
    var translate_value_x = 150;
    var translate_value_y = 50;
    var result = '';
    
    for(var column_i=0 ; column_i<columns.length ; column_i++){
        var column = columns[column_i]
        result += '<svg id="' + origin_hexamerid + '" class="hexamer-figure" viewBox="0 0 750 200">' +
                        //' width="'+ hexamer_figure_width + '" height="'+ hexamer_figure_height  + '">' +
                        '<g class="hexamer-baseaxes" transform="translate(30,0)">'  //'width="' + width + '" height="'+ height + '">'
                           + hexamer_data(data=data, column=column, width=width, height=height) 
                           + hexmaer_xtick(width=width, g_translate_x=translate_value_x) 
                           + hexamer_ytick(width=width, height=height, g_translate_y=translate_value_y)
                           + hexamer_title(column=column) +
                        '</g></svg>';
        //translate_value_x+=50; translate_value_y+=50;
    }
	/*var result = '<svg id="' + origin_hexamerid + '" class="hexamer-figure" style="margin: 10px 50px 0px 50px;"' +
                        ' width="'+ hexamer_figure_width + '" height="'+ hexamer_figure_height  + '">' +
                        '<g class="hexamer-baseaxes" transform="translate(30,0)" ' + 'width="' + width + '" height="'+ height + '">'
                           + hexamer_data(data=data, column=column, width=width, height=height) 
                           + hexmaer_xtick(width=width,g_translate_x=translate_value_x) 
                           + hexamer_ytick(height=height-50, g_translate_y=translate_value_y)
                           + hexamer_title(column=column) +
                        '</g></svg>';
                        */
    //console.log(result);
    $(id).html(result);
    $(document).ready(function() {
        $('.tooltip').tooltipster({ contentCloning: true, theme: 'tooltipster-shadow'});
    });
}
