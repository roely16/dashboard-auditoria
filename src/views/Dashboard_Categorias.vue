<template>
    <div>
        <v-container fluid>
            <v-row justify="center" align="center">
                <v-col cols="1">
                    <v-img width="75" src="@/assets/logo_muni_circulo.png" contain></v-img>
                </v-col>
                <v-col class="text-center" cols="10">
                    <h1>Monitoreo de Cumplimiento de Protocolos</h1>
                    <h2 class="success--text">{{ fecha }}</h2>
                </v-col>
                <v-col>
                    <v-img width="100" src="@/assets/logoAve.png" contain></v-img>
                </v-col>
            </v-row>
            <v-divider></v-divider>

            <!-- Gráficas -->

            <v-container>
                <v-row >
                    <v-col v-for="(ruta, index) in rutas" :key="index" cols="12">
                        <Grafica :tipo_ruta="ruta.nombre" :series="ruta.serie" :categorias="ruta.categorias_com" :icon="ruta.categoria.icono" :title="ruta.categoria.nombre_dashboard" />
                    </v-col>
                </v-row>
            </v-container>

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

    import Grafica from '@/components/Grafica.vue'
    import Configuracion from '@/components/Configuracion_Categorias.vue'

    export default {
        components: {
            Grafica,
            Configuracion
        },
        data(){
            return{
                indicadores: [],
                configuracion: {},
                total_reportes: null,
                fecha: null,
                rutas: []
            }
        },
        methods: {

            obtener_datos(){

                console.log('obtener datos');

                this.rutas = []

                let data = {
                    ruta: this.configuracion.ruta,
                    id_categoria: this.configuracion.id_categoria
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + '/obtener_indicadores_categoria.php', data)
                .then((response) => {

                    console.log(response.data);
                    this.rutas = response.data.rutas
                    this.fecha = response.data.fecha

                })

            },
            configuracion_inicial(){

                // Obtener el localStorage
                let configuracion_inicial = JSON.parse(localStorage.getItem('configuracion_dashboard_2'))

                if (!configuracion_inicial) {
                    
                    let data = {
                        // id_rol: "1",
                        // columnas: "4",
                        // alto_contenedor: "200",
                        // titulo: "16",
                        // altura_titulo: "25",
                        // porcentaje: "40",
                        // altura_porcentaje: "25",
                        // detalle: "16",
                        // altura_detalle: "25",
                        ruta: 'L',
                        id_categoria: "1"
                    }

                    localStorage.setItem('configuracion_dashboard_2', JSON.stringify(data))

                }

                // Obtener la configuración
                this.configuracion = JSON.parse(localStorage.getItem('configuracion_dashboard_2'))

            },
            actualizar_config(){

                this.configuracion = JSON.parse(localStorage.getItem('configuracion_dashboard_2'))

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