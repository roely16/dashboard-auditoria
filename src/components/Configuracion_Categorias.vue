<template>
    <div>
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon>
                        mdi-cog
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    Configuración
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12"> 
                            <v-select
                                v-model="configuracion.ruta"
                                :items="rutas"
                                outlined
                                hide-details
                                label="Ruta"
                                item-text="nombre"
                                item-value="id"
                            ></v-select>
                        </v-col>
                        <v-col cols="12"> 
                            <v-select
                                v-model="configuracion.id_categoria"
                                :items="categorias"
                                outlined
                                hide-details
                                label="Categoria"
                                item-text="nombre"
                                item-value="id"
                            ></v-select>
                        </v-col>
                        <!-- <v-col cols="12">
                            <v-text-field label="Tamaño de Columna" outlined hide-details v-model="configuracion.columnas"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Alto de Contenedor" outlined hide-details v-model="configuracion.alto_contenedor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Tamaño de Fuente Título" outlined hide-details v-model="configuracion.titulo"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Altura de Título" outlined hide-details v-model="configuracion.altura_titulo"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Tamaño de Fuente Porcentaje" outlined hide-details v-model="configuracion.porcentaje"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Altura de Porcentaje" outlined hide-details v-model="configuracion.altura_porcentaje"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Tamaño de Fuente Detalle" outlined hide-details v-model="configuracion.detalle"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Altura de Detalle" outlined hide-details v-model="configuracion.altura_detalle"></v-text-field>
                        </v-col> -->

                        <v-col cols="12">
                            <v-btn @click="dialog = false" class="mr-2" color="secondary">
                                Cancelar
                            </v-btn>
                            <v-btn @click="guardar()" color="primary">
                                Guardar
                            </v-btn>
                        </v-col>
                    </v-row>

                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                dialog: false,
                roles: [],
                configuracion: {
                    tipo_ruta: null
                },
                categorias: [],
                rutas: [
                    {
                        id: "L",
                        nombre: "Ruta Larga"
                    },
                    {
                        id: "C",
                        nombre: "Ruta Corta"
                    }
                ]
            }
        },
        methods: {

            obtener_datos(){

                // Obtener la configuración 
                this.configuracion = JSON.parse(localStorage.getItem('configuracion_dashboard_2'))
                
                this.axios
                .get(process.env.VUE_APP_API_URL + '/obtener_categorias_dashboard.php')
                .then((response) => {

                    console.log(response.data);
                    this.categorias = response.data

                })

            },
            guardar(){

                localStorage.setItem('configuracion_dashboard_2', JSON.stringify(this.configuracion))

                this.$emit('actualizar_config')

                this.dialog = false

            }

        },
        watch: {

            dialog: function(val){

                if (val) {
                    
                    this.obtener_datos()

                }

            }

        },
        mounted(){

            this.obtener_datos()

        }
    }
</script>