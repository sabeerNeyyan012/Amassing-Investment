/**
 * Sample for Candle Series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, ColumnSeries, Crosshair, StripLine, RowDirective, RowsDirective, SeriesDirective, Inject } from '@syncfusion/ej2-react-charts';
import { enableRipple } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import {chartData} from './data'
export let zoomFactor;
export let zoomPosition;
export let pointColors = [];
enableRipple(true);
/**
 * Candle sample
 */
export class SampleBase extends React.PureComponent {
    rendereComplete() {
        /**custom render complete function */
    }
    componentDidMount() {
        setTimeout(() => {
            this.rendereComplete();
        });
    }
}

export default class HiloChart extends SampleBase {
    constructor() {
        super(...arguments);
        this.getLabelText = (value) => {
            return (((value) / 1000000000)).toFixed(1) + 'bn';
        };
    }
    
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    load(args) {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        // let selectedTheme = location.hash.split('/')[1];
        // selectedTheme = selectedTheme ? selectedTheme : 'Material';
        // args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    axisLabelRender(args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = this.getLabelText(+args.text);
        }
        if (args.axis.name === 'secondary') {
            args.text = '$' + args.text;
        }
    }
    tooltipLabelRender(args) {
        if (!args.series.index) {
            args.text = 'Volume : <b>' +
                this.getLabelText(args.text.split('<b>')[1].split('</b>')[0]) + '</b>';
        }
    }
    renderPoint(args) {
        if (args.series.type === 'Candle') {
            pointColors.push(args.fill);
        }
        else {
            args.fill = pointColors[args.point.index];
        }
    };
    render() {
        
        return (<div className='control-pane'>

            <div className='control-section'>
                {/* <div className="row" style={{ textAlign: "center" }}>
                    <div id="title"> AAPL Historical</div>
                </div> */}
                <div className="row">
                    <ChartComponent
                        id='charts'
                        style={{ textAlign: "center" }}
                        ref={chart => this.chart1 = chart}
                        load={this.load.bind(this)}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Volume',
                            rangePadding: 'None',
                            valueType: 'Logarithmic',
                            opposedPosition: true,
                            majorGridLines: { width: 1 },
                            lineStyle: { width: 0 },
                            stripLines: [
                                {
                                    end: 1300000000, 
                                    startFromAxis: true, 
                                    // text: '', color: 'black', 
                                    visible: true,
                                    opacity: 0.03, 
                                    zIndex: 'Behind'
                                }
                            ]
                        }}
                        tooltip={{
                            enable: true, shared: true
                        }}
                        width={Browser.isDevice ? '100%' : '100%'} 
                        crosshair={{ enable: true, lineType: 'Vertical' }} 
                        pointRender={this.renderPoint.bind(this)} 
                        axisLabelRender={this.axisLabelRender.bind(this)} 
                        tooltipRender={this.tooltipLabelRender.bind(this)} 
                        chartArea={{ border: { width: 0 } }}
                    >
                        <Inject services={[CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair]} />
                        <RowsDirective>
                            <RowDirective height={'30%'}>
                            </RowDirective>
                            <RowDirective height={'70%'}>
                            </RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective 
                                name='secondary' 
                                opposedPosition={true} 
                                rowIndex={1} 
                                majorGridLines={{ width: 1 }} 
                                labelFormat='n0' 
                                title='Price' 
                                plotOffset={30} 
                                lineStyle={{ width: 0 }}
                            >
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective 
                                type='Column' 
                                dataSource={chartData} 
                                animation={{ enable: true }} 
                                xName='x' 
                                yName='volume' 
                                name='Volume'
                            >
                            </SeriesDirective>
                            <SeriesDirective 
                                type='Candle' 
                                yAxisName='secondary' 
                                bearFillColor='#2ecd71' 
                                bullFillColor='#e74c3d' 
                                dataSource={chartData} 
                                animation={{ enable: true }} 
                                xName='x' 
                                low='low' 
                                high='high'
                                open='open' 
                                close='close' 
                                name={this.props.CompanyName}
                                volume='volume'
                            >
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
        </div>);
    }
}