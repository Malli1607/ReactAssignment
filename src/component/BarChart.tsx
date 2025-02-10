import { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";   



import  Axios  from "axios";

const BarChart = () => {
  const [chartData, setChartData] = useState<any>([]);

  
  const users: any[] = useSelector((state: RootState) => state.person.people);   


  const fetchData = async () =>{

        const response = await Axios.get('http://localhost:3500/api/department');

        setChartData(response.data);
  }

  useEffect(() => {

    fetchData();
  
  }, [users]);

  useEffect(() => {
    if (chartData.length === 0) return;

 
    let root = am5.Root.new('chartDiv1');
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, { panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft:0,
      paddingRight:1,
      
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);   

    let xRenderer = am5xy.AxisRendererX.new(root, { 
      minGridDistance: 10, 
      minorGridEnabled: true 
    });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "category",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, {});
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: yRenderer }));

    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "category",
      sequencedInterpolation: true,
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });

 
    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartData]);   

  return (
    <div className="chart">
      <div id="chartDiv1" className="sub-chart" style={{ width: "100%", height: "200px" }}></div>
    </div>
  );
};

export default BarChart;
