import React, {useRef} from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';
import {songsService} from "../../../../services/SongsService";
import {usersService} from "../../../../services/UsersService";

const Metrics = () => {
    const pieChart1 = useRef(null)
    const pieChart2 = useRef(null)
    const pieChart3 = useRef(null)
    const pieChart4 = useRef(null)
    const pieChart5 = useRef(null)

    React.useEffect(() => {
        songsService.getSongs(null, songs => {
            pieChart1.current.chart.update(_getOptions("pie", "Songs by Genre", _mapEntityBy(songs, "genre")))
            pieChart2.current.chart.update(_getOptions("pie", "Songs by Artist", _mapEntityBy(songs, "artist")))
            pieChart4.current.chart.update(_getOptions("pie", "Songs by Status", _mapEntityBy(songs, "status")))
        })
    }, []);

    React.useEffect(() => {
        usersService.getUsers(null, users => {
            pieChart3.current.chart.update(_getOptions("pie", "Users by Status", _mapEntityBy(users, "status")))
            pieChart5.current.chart.update(_getOptions("pie", "Users by Type", _mapEntityBy(users, "user_type")))
        })
    }, []);

    return (
        <React.Fragment>
            <div>
                <HighchartsReact ref={pieChart1} highcharts={Highcharts} options={_getOptions()}/>
                <HighchartsReact ref={pieChart2} highcharts={Highcharts} options={_getOptions()}/>
                <HighchartsReact ref={pieChart4} highcharts={Highcharts} options={_getOptions()}/>
                <HighchartsReact ref={pieChart3} highcharts={Highcharts} options={_getOptions()}/>
                <HighchartsReact ref={pieChart5} highcharts={Highcharts} options={_getOptions()}/>
            </div>
        </React.Fragment>
    );
}

function _mapEntityBy(objs, attr) {
    let aux = {}
    objs.forEach(obj => {
        if (obj["artists"] != null) {
            obj["artist"] = obj["artists"][0]
        }
        if (obj["is_active"] != null) {
            obj["status"] = obj["is_active"] ? "active" : "inactive"
        }

        if (aux[obj[attr]] != null) {
            aux[obj[attr]]++
        } else {
            aux[obj[attr]] = 1
        }
    })

    let data = []
    for (const [k, v] of Object.entries(aux)) {
        data.push([k, v])
    }
    return data;
}

function _getOptions(type = "", title = "", data = []) {
    return {
        chart: {
            type: type,
            plotBackgroundColor: null,
        },
        title: {
            text: title
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                },
                showInLegend: true
            }
        },
        tooltip: {
            pointFormat: '{point.percentage:.1f}%<br>{point.y}'
        },
        series: [
            {
                data: data
            }
        ]
    };
}

export default Metrics;