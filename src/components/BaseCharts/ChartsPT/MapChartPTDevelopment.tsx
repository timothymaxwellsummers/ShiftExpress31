import { Select, Option, Stack } from "@mui/joy";
import * as d3 from "d3";
import germanyGeoJSON from "../../../data/germany-states.json";
import React, { useEffect, useRef, useState } from 'react';
import { FeatureCollection } from 'geojson';
import { TransportData, YearlyData as TransportYearlyData } from '../../../data/pTDataInterface';
import { PopulationData, YearlyData as PopulationYearlyData } from '@/data/populationInterface';

interface Props {
    transportData: TransportYearlyData;
}

const mapData: FeatureCollection = germanyGeoJSON as FeatureCollection;

const MapChart: React.FC<Props> = ({transportData}) => {
    const [startYear, setStartYear] = useState<string>('2013');
    const [endYear, setEndYear] = useState<string>('2022');
    const [selectedMetric, setSelectedMetric] = useState<keyof TransportData>('total_local_passengers');
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedTransportMetric, setSelectedTransportMetric] = useState<keyof TransportData>('total_local_passengers');

    const calculatePercentageChange = (state: string, metric: keyof TransportData) => {
        const startYearData = transportData[startYear].find(d => d.state === state);
        const endYearData = transportData[endYear].find(d => d.state === state);

        if (!startYearData || !endYearData) {
            return 0;
        }

        const startValue = startYearData[metric];
        const endValue = endYearData[metric];

        if (typeof startValue === 'number' && typeof endValue === 'number') {
            return ((endValue - startValue) / startValue) * 100;
        } else {
            return 0;
        }
    };

    const colorScale = d3.scaleLinear<string>()
        .domain([-3, 0, 3]) // Adjust domain as per your data range
        .range(['red', 'white', 'green']); // Change colors as needed

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);

        // Define projection
        const projection = d3.geoMercator().fitSize([width, height], mapData);

        // Create a path generator
        const pathGenerator = d3.geoPath().projection(projection);

        //Handling the mouse hover
        const handleMouseOver = (event: React.MouseEvent<SVGPathElement, MouseEvent>, d: any) => {
            setSelectedState(d.properties.name);
            d3.select(event.currentTarget as Element).style('fill', '#4748dc');
        };
        
        //Handling the mouse exit
        const handleMouseOut = (event: React.MouseEvent<SVGPathElement, MouseEvent>, d: any) => {
            setSelectedState(null);
            d3.select(event.currentTarget as Element).style('fill', 'rgba(3,4,94,0.92)');
        };



        // Render the map
        svg.selectAll('path')
            .data(mapData.features)
            .join('path')
            .attr('d', d => pathGenerator(d) as string)
            // @ts-ignore
            .style('fill', d => colorScale(calculatePercentageChange(d.properties.id, selectedMetric)))
            .style('stroke', '#CDD7E1')
            .style('stroke-width', 1.5);
    }, [startYear, endYear, selectedMetric]);

    const width = 300;
    const height = 450;

    return (
        <>
        <Stack direction={"row"}>
                <Stack gap={"5px"}>
                    <Select defaultValue="2013" sx={{ maxWidth: "100px" }}>
                        <Option value="2013" onClick={() => setStartYear('2013')}>2013</Option>
                        <Option value="2014" onClick={() => setStartYear('2014')}>2014</Option>
                        <Option value="2015" onClick={() => setStartYear('2015')}>2015</Option>
                        <Option value="2016" onClick={() => setStartYear('2016')}>2016</Option>
                        <Option value="2017" onClick={() => setStartYear('2017')}>2017</Option>
                        <Option value="2018" onClick={() => setStartYear('2018')}>2018</Option>
                        <Option value="2019" onClick={() => setStartYear('2019')}>2019</Option>
                        <Option value="2020" onClick={() => setStartYear('2020')}>2020</Option>
                        <Option value="2021" onClick={() => setStartYear('2021')}>2021</Option>
                        <Option value="2022" onClick={() => setStartYear('2022')}>2022</Option>
                    </Select>
                    <Select defaultValue="2022" sx={{ maxWidth: "100px" }}>
                        <Option value="2013" onClick={() => setEndYear('2013')}>2013</Option>
                        <Option value="2014" onClick={() => setEndYear('2014')}>2014</Option>
                        <Option value="2015" onClick={() => setEndYear('2015')}>2015</Option>
                        <Option value="2016" onClick={() => setEndYear('2016')}>2016</Option>
                        <Option value="2017" onClick={() => setEndYear('2017')}>2017</Option>
                        <Option value="2018" onClick={() => setEndYear('2018')}>2018</Option>
                        <Option value="2019" onClick={() => setEndYear('2019')}>2019</Option>
                        <Option value="2020" onClick={() => setEndYear('2020')}>2020</Option>
                        <Option value="2021" onClick={() => setEndYear('2021')}>2021</Option>
                        <Option value="2022" onClick={() => setEndYear('2022')}>2022</Option>
                    </Select>
                </Stack>
                <Select defaultValue="total_local_passengers" sx={{ minWidth: "250px", maxHeight:"30px", marginLeft: "10px" }}>
                    <Option value="total_local_passengers" onClick={() => setSelectedMetric('total_local_passengers')}>Total Local Passengers</Option>
                    <Option value="total_local_passenger_km" onClick={() => setSelectedMetric('total_local_passenger_km')}>Total Local Passenger Km</Option>
                </Select>
            </Stack>
        <Stack direction="row">
                <Stack direction="column" paddingRight="25px">
                    <svg ref={svgRef} width={width} height={height}></svg>
                    {selectedState && (
                        <div style={{ position: 'absolute', pointerEvents: 'none' }}>
                            {selectedState}
                        </div>
                    )}
                </Stack>
            </Stack>
        </>
    );
};

export default MapChart;