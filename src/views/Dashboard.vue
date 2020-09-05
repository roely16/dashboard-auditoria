<template>
    <div>
        <v-container fluid>
             <v-row justify="center" align="center">
                <v-col cols="1">
                    <v-img width="75" src="@/assets/logo_muni_circulo.png" contain></v-img>
                </v-col>
                <v-col class="text-center" cols="10">
                    <h1>Monitoreo de Cumplimiento de Protocolos (Tablero General)</h1>
                    <!-- <h2 class="success--text">Comprende el ejercicio efectuado 29 y 30 de agosto 2020</h2> -->
                    <h2 class="success--text">Fecha: {{ fecha }}</h2>
                </v-col>
                <v-col>
                    <v-img width="100" src="@/assets/logoAve.png" contain></v-img>
                </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-row align="center">
                <v-col cols="6">
                    <!-- <h1>
                        <v-icon color="primary" x-large>mdi-bus</v-icon>
                        Buses Evaluados:
                        {{ total_reportes }}
                    </h1> -->
                </v-col>
                <v-col cols="6">
                    <h1 v-if="configuracion.tipo_ruta == 'L'" class="text-right">
                        <v-icon color="primary" x-large>mdi-road-variant</v-icon>
                        Ruta Larga
                    </h1>

                    <h1 v-if="configuracion.tipo_ruta == 'C'" class="text-right">
                        <v-icon color="primary" x-large>mdi-road-variant</v-icon>
                        Ruta Corta
                    </h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col v-for="(indicador, key) in indicadores" :key="key" :cols="configuracion.columnas">
                    <Indicador :color="indicador.color_porcentaje" :porcentaje="indicador.porcentaje" :cumplio="indicador.cumplen" :no_cumplio="indicador.no_cumplen" :configuracion="configuracion" :titulo="indicador.nombre_dashboard" />
                </v-col>
            </v-row>

            <!-- Configuración -->
            <v-row dense no-gutters justify="end">
                <v-col align="end" cols="2">
                    <Configuracion @actualizar_config="actualizar_config()" />
                </v-col>
            </v-row>

        </v-container>
       
    </div>
</template>

<script>

    import Indicador from '@/components/Indicador'
    import Configuracion from '@/components/Configuracion'

    export default {
        
        components: {
            Indicador,
            Configuracion
        },
        data(){
            return{
                indicadores: [],
                configuracion: {},
                total_reportes: null,
                fecha: null
            }
        },
        methods: {
            
            obtener_datos(){

                let configuracion_inicial = JSON.parse(localStorage.getItem('configuracion_dashboard'))

                if (configuracion_inicial) {
                    
                    let data = {
                        id_rol: configuracion_inicial.id_rol,
                        tipo_ruta: configuracion_inicial.tipo_ruta
                    }

                    this.axios
                    .post(process.env.VUE_APP_API_URL + '/obtener_indicadores.php', data)
                    .then((response) => {

                        console.log(response.data);
                        this.indicadores = response.data.actividades
                        this.total_reportes = response.data.total_reportes
                        this.fecha = response.data.fecha

                    })

                }
                
            },
            configuracion_inicial(){

                // Obtener el localStorage
                let configuracion_inicial = JSON.parse(localStorage.getItem('configuracion_dashboard'))

                if (!configuracion_inicial) {
                    
                    let data = {
                        id_rol: "1",
                        columnas: "3",
                        alto_contenedor: "200",
                        titulo: "32",
                        altura_titulo: "25",
                        porcentaje: "80",
                        altura_porcentaje: "25",
                        detalle: "20",
                        altura_detalle: "25",
                        tipo_ruta: "L"
                    }

                    localStorage.setItem('configuracion_dashboard', JSON.stringify(data))

                }

                // Obtener la configuración
                this.configuracion = JSON.parse(localStorage.getItem('configuracion_dashboard'))

            },
            actualizar_config(){

                this.configuracion = JSON.parse(localStorage.getItem('configuracion_dashboard'))

                this.obtener_datos()

            }

        },
        mounted(){

            this.configuracion_inicial()
            this.obtener_datos()

            this.$nextTick(function () {
                window.setInterval(() => {
                    
                    this.configuracion_inicial()
                    this.obtener_datos()

                },15000);
            })

        }

    }
</script>