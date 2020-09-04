<template>
    <div>

        <v-container fluid>
             <v-row justify="center" align="center">
                <v-col cols="1">
                    <v-img width="75" src="@/assets/logo_muni_circulo.png" contain></v-img>
                </v-col>
                <v-col class="text-center" cols="10">
                    <h1>Monitoreo de Cumplimiento de Protocolos</h1>
                    <!-- <h2 class="success--text">Fecha {{ fecha }}</h2> -->
                </v-col>
                <v-col>
                    <v-img width="100" src="@/assets/logoAve.png" contain></v-img>
                </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-row>
                <v-col cols="3">
                    <v-select
                        v-model="grafica.tipo_ruta"
                        :items="rutas"
                        outlined
                        hide-details
                        label="Tipo de Ruta"
                        item-text="nombre"
                        item-value="id"
                    ></v-select>
                </v-col>
                <v-col cols="3">
                    <v-select
                        v-model="grafica.empresa"
                        :items="com_transporte"
                        outlined
                        hide-details
                        label="Empresa"
                        item-text="nombre"
                        item-value="nombre"
                    ></v-select>
                </v-col>
                <v-col>
                    <v-btn :disabled="!grafica.empresa || !grafica.tipo_ruta" @click="generar_grafica()">
                        Generar
                    </v-btn>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="3">

                </v-col>
                <v-col v-if="categorias">
                    <h1>
                        <v-icon color="primary" x-large>mdi-bus</v-icon>
                        Buses Evaluados:
                        {{ total_buses }}
                    </h1>
                </v-col>
            </v-row>

            <v-row>

                <v-col v-if="categorias">
                    <highcharts :options="chartOptions"></highcharts>
                </v-col>

            </v-row>
        </v-container>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                grafica: {},
                total_buses: null,
                chartOptions: {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: undefined
                    },
                    xAxis: {
                        categories: [],
                        title: {
                            text: null
                        },
                        labels: {
                            style: {
                                fontSize: "20px",
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
                                    fontSize: "15px"
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
                    series: null

                },
                rutas: [
                    {
                        "id": "L",
                        "nombre": "Ruta Larga"
                    },
                    {
                        "id": "C",
                        "nombre": "Ruta Corta"
                    }

                ],
                com_transporte: [],
                categorias: null

            }
        },
        methods: {
            obtener_com_transporte(val){

                let data = {
                    tipo_ruta: val
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/obtener_empresas.php', data)
                .then((response) => {

                    console.log(response.data);
                    this.com_transporte = response.data

                })

            },
            generar_grafica(){


                let data = {
                    tipo_ruta: this.grafica.tipo_ruta,
                    empresa: this.grafica.empresa
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/grafica_empresa.php', data)
                .then((response) => {

                    console.log(response.data);
                    this.chartOptions.xAxis.categories = response.data.categorias
                    this.chartOptions.series = response.data.series
                    this.total_buses = response.data.total_buses
                    this.categorias = response.data.categorias

                })

            }
        },
        watch: {
            'grafica.tipo_ruta': function(val){
                
                if (val) {
                    
                    this.obtener_com_transporte(val)

                }

            }
        }
    }
</script>