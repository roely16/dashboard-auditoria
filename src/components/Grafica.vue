<template>
    <div>
        <v-row align="center">
            <v-col cols="12">
                <h1>
                    <v-icon color="primary" x-large>{{ icon }}</v-icon>
                    {{ title }} {{ tipo_ruta }}
                </h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <highcharts :options="chartOptions"></highcharts>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ""
            },
            icon: {
                type: String,
                default: ""
            },
            categorias: {
                type: Array,
                default: null
            },
            series: {
                type: Object,
                default: null
            },
            tipo_ruta: {
                type: String,
                default: ""
            }
        },
        data(){
            return{
                chartOptions: {
                    chart: {
                        type: 'bar',
                        height: "550px"
                    },
                    title: {
                        text: undefined
                    },
                    xAxis: {
                        categories: this.categorias,
                        title: {
                            text: null
                        },
                        labels: {
                            style: {
                                fontSize: "15px",
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        labels: {
                            overflow: 'justify',
                            
                        },
                        title: {
                            text: "%"
                        }
                        
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                style: {
                                    fontSize: "25px"
                                },
                                formatter: function(){
                                    return this.y + '%'
                                }
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: false,
                        borderWidth: 1,
                        backgroundColor:'#FFFFFF',
                        shadow: true,
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    series: [this.series]

                }
            }
        }

    }
</script>