/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict'

import React from 'react';
import {
  ART,
  Platform, 
  StyleSheet, 
  ScrollView, 
  Button, 
  Image, 
  Text, 
  View,
  Dimensions,
  DatePickerAndroid,
  TouchableHighlight
} from 'react-native';
import * as d3scale from 'd3-scale';
import * as d3shape from 'd3-shape';
import * as d3Array from 'd3-array';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
//简单封装一个组件
class CustomButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
const { width } = Dimensions.get('window');
console.disableYellowBox = true;

const pieData = [
  { number: 8, name: 'Fun activities' },
  { number: 7, name: 'Dog' },
  { number: 16, name: 'Food' },
  { number: 23, name: 'Car' },
  { number: 23, name: 'Rent' },
  { number: 4, name: 'Misc' }
];

const lineData = [
  [
    { date: new Date(2017, 9, 24), value: 93.24 },
    { date: new Date(2017, 9, 25), value: 95.35 },
    { date: new Date(2017, 9, 26), value: 98.84 },
    { date: new Date(2017, 9, 27), value: 99.92 },
    { date: new Date(2017, 9, 28), value: 99.80 },
    { date: new Date(2017, 9, 29), value: 99.47 }
  ], [
    { date: new Date(2017, 9, 24), value: 92.24 },
    { date: new Date(2017, 9, 25), value: 94.35 },
    { date: new Date(2017, 9, 26), value: 97.84 },
    { date: new Date(2017, 9, 27), value: 98.92 },
    { date: new Date(2017, 9, 28), value: 98.80 },
    { date: new Date(2017, 9, 29), value: 98.47 }
  ], [
    { date: new Date(2017, 9, 24), value: 91.24 },
    { date: new Date(2017, 9, 25), value: 93.35 },
    { date: new Date(2017, 9, 26), value: 96.84 },
    { date: new Date(2017, 9, 27), value: 97.92 },
    { date: new Date(2017, 9, 28), value: 97.80 },
    { date: new Date(2017, 9, 29), value: 98.47 }
  ], [
    { date: new Date(2017, 9, 24), value: 90.24 },
    { date: new Date(2017, 9, 25), value: 93.35 },
    { date: new Date(2017, 9, 26), value: 95.84 },
    { date: new Date(2017, 9, 27), value: 96.92 },
    { date: new Date(2017, 9, 28), value: 96.80 },
    { date: new Date(2017, 9, 29), value: 96.47 }
  ]
];
const areaData = [
  [
    { date: new Date(2017, 9, 24), value1: 93.24, value0: 92.24  },
    { date: new Date(2017, 9, 25), value1: 95.35, value0: 94.35  },
    { date: new Date(2017, 9, 26), value1: 98.84, value0: 97.84  },
    { date: new Date(2017, 9, 27), value1: 99.92, value0: 98.92  },
    { date: new Date(2017, 9, 28), value1: 99.80, value0: 98.80  },
    { date: new Date(2017, 9, 29), value1: 99.47, value0: 98.47  }
  ], [
    { date: new Date(2017, 9, 24), value1: 92.24, value0: 91.24 },
    { date: new Date(2017, 9, 25), value1: 94.35, value0: 93.35 },
    { date: new Date(2017, 9, 26), value1: 97.84, value0: 96.84 },
    { date: new Date(2017, 9, 27), value1: 98.92, value0: 97.92 },
    { date: new Date(2017, 9, 28), value1: 98.80, value0: 97.80 },
    { date: new Date(2017, 9, 29), value1: 98.47, value0: 98.47 }
  ], [
    { date: new Date(2017, 9, 24), value1: 91.24, value0: 90.24 },
    { date: new Date(2017, 9, 25), value1: 93.35, value0: 93.35 },
    { date: new Date(2017, 9, 26), value1: 96.84, value0: 95.84 },
    { date: new Date(2017, 9, 27), value1: 97.92, value0: 96.92 },
    { date: new Date(2017, 9, 28), value1: 97.80, value0: 96.80 },
    { date: new Date(2017, 9, 29), value1: 98.47, value0: 96.47 }
  ], [
    { date: new Date(2017, 9, 24), value1: 90.24, value0: 90.24 },
    { date: new Date(2017, 9, 25), value1: 93.35, value0: 90.24 },
    { date: new Date(2017, 9, 26), value1: 95.84, value0: 90.24 },
    { date: new Date(2017, 9, 27), value1: 96.92, value0: 90.24 },
    { date: new Date(2017, 9, 28), value1: 96.80, value0: 90.24 },
    { date: new Date(2017, 9, 29), value1: 96.47, value0: 90.24 }
  ]
]

const colors = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722'
];

/*type Props={};*/
/*type State={};*/
export default class App extends React.PureComponent/*<Props,State>*/ {
  constructor(props){
    super(props)
    this.state = {
      date: '15-05-2016',
      chart: 'pie',
      presetDate: new Date(2016, 3, 5),
      allDate: new Date(2020, 4, 5),
      simpleText: '选择日期,默认今天',
      minText: '选择日期,不能比今日再早',
      maxText: '选择日期,不能比今日再晚',
      presetText: '选择日期,指定2016/3/5',
    }
  }
  //进行创建时间日期选择器
  async showPicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);      
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }
  onPressLearnMore(){
    //For generating alert on buttton click
    alert('Hello');
  }
  renderButtons() {
    return (
      <View style={{ height: 60, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pie" onPress={() => this.setState({ chart: 'pie' })} />
        <Button title="Line" onPress={() => this.setState({ chart: 'line' })} />
        <Button title="Area" onPress={() => this.setState({ chart: 'area' })} />
      </View>
    )
  }

  renderPieChart() {
    const arcs = d3shape.pie().value((item) => item.number)(pieData)
    const pieChart = { paths: [] }
    arcs.map((arc, index) => {
      const path = d3shape.arc().outerRadius(180).padAngle(.05).innerRadius(30)(arc)
      pieChart.paths.push({ path })
    })
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>Pie Chart</Text>
        <ART.Surface width={width} height={width}>
          <ART.Group x={width / 2} y={width / 2}>
            {
              pieChart.paths.map((item, index) =>
                (
                  <ART.Shape
                    key={`pie_shape_${index}`}
                    fill={colors[index]}
                    stroke={colors[index]}
                    d={item.path}
                  />
                )
              )
            }
          </ART.Group>
        </ART.Surface>
      </View>
    )
  }

  renderLineChart() {
    const y = d3scale.scaleLinear().domain([90.24, 99.92]).range([width - 80, 0])
    const x = d3scale.scaleTime().domain([new Date(2017, 9, 24), new Date(2017, 9, 29)]).range([0, width - 40])
    const lineChart = { paths: [] }
    lineData.map((line, index) => {
      const path = d3shape.line().x((d) => x(d.date)).y((d) => y(d.value))(line)
      lineChart.paths.push({ path })
    })

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>Line Chart</Text>
        <ART.Surface width={width} height={width}>
          <ART.Group x={20} y={60}>
            {
              lineChart.paths.map((item, index) =>
                (
                  <ART.Shape
                    key={`line_shape_${index}`}
                    d={item.path}
                    stroke={colors[index + 5]}
                    strokeWidth={3}
                  />
                )
              )
            }
          </ART.Group>
        </ART.Surface>
      </View>
    )
  }

  renderAreaChart() {
    const y = d3scale.scaleLinear().domain([90.24, 99.92]).range([width - 80, 0])
    const x = d3scale.scaleTime().domain([new Date(2017, 9, 24), new Date(2017, 9, 29)]).range([0, width - 40])
    const areaChart = { paths: [] }
    areaData.map((area, index) => {
      const path = d3shape.area().x((d) => x(d.date)).y1((d) => y(d.value1)).y0((d) => y(d.value0))(area)
      areaChart.paths.push({ path })
    })

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>Area Chart</Text>
        <ART.Surface width={width} height={width}>
          <ART.Group x={20} y={60}>
            {
              areaChart.paths.map((item, index) =>
                (
                  <ART.Shape
                    key={`area_shape_${index}`}
                    d={item.path}
                    stroke={colors[colors.length - (index + 1)]}
                    fill={colors[colors.length - (index + 1)]}
                  />
                )
              )
            }
          </ART.Group>
        </ART.Surface>
      </View>
    )
  }

  render() {
    let chart;
    switch (this.state.chart) {
      case 'pie':
        chart = this.renderPieChart()
        break
      case 'line':
        chart = this.renderLineChart()
        break
      case 'area':
        chart = this.renderAreaChart()
        break
      default:
        chart = this.renderPieChart()
    }
    //return (
    //<View style={{ flex: 1 }}>
    //{this.renderButtons()}
    //{chart}
    //</View>
    //);
    const artPath = ART.Path();
    artPath.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    artPath.lineTo(300,1); //连线到目标点(300,1)
    return (
      <View style={styles.container}>
      <ScrollView>
      <View style={{ height: 500 }}>
      <View style={{ flex: 1 }}>
        {this.renderButtons()}
        {chart}
        </View>
      </View>
      <Text style={styles.welcome}>Hello, world!{this.state.date}</Text>
      <ART.Surface width={300} height={2}>
          <ART.Shape d={artPath} stroke="#000000" strokeWidth={1} />
      </ART.Surface>
      <Button
        onPress={this.onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
        <Image
          source={{uri: 'https://facebook.github.io/react-native/img/header_logo.png'}}
          style={{width: 66, height: 58, resizeMode: "contain"}}
        />
        <Text>
          On iOS, a React Native ScrollView uses a native UIScrollView.
          On Android, it uses a native ScrollView.
        </Text>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#a5a5a5"
          onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
          <Text style={styles.buttonText}>点击弹出基本日期选择器</Text>
        </TouchableHighlight>
        <CustomButton text={this.state.presetText}
        onPress={this.showPicker.bind(this, 'preset', {date: this.state.presetDate})}/>
        <CustomButton text={this.state.minText}
        onPress={this.showPicker.bind(this, 'min', {date: this.state.minDate,minDate:new Date()})}/>
        <CustomButton text={this.state.maxText}
        onPress={this.showPicker.bind(this, 'max', {date: this.state.maxDate,maxDate:new Date()})}/>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    backgroundColor: 'cyan',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    //margin:5,
    backgroundColor: 'green',
    //padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
  buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
  },
});
