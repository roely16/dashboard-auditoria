<template>
    <div>
        <v-card :height="configuracion.alto_contenedor">
            <v-card-text>
                <v-row dense no-gutters align="start" :style="'height: ' + configuracion.altura_titulo + 'px'">
                    <v-col>
                        <h2 :style="'font-size: ' + configuracion.titulo + 'px'" class="text-center">{{ titulo }}</h2>
                    </v-col>
                </v-row>
                
            </v-card-text>

           

            <v-card-text>
                <v-row dense align="center" no-gutters :style="'height: ' + configuracion.altura_porcentaje + 'px'" class="text-center">
                    
                    <v-col cols="12">
                        <h1 :class="color+'--text'" :style="'font-size: ' + configuracion.porcentaje + 'px'" class="text-center">{{ porcentaje }}%</h1>
                    </v-col>
                    
                </v-row>

                
            </v-card-text>

             <!-- <v-card-text>
                <v-row no-gutters :style="'height: ' + configuracion.altura_detalle + 'px'" align="end" class="text-center">
                    <v-col align-self="end">
                        <h5 :style="'font-size: ' + configuracion.detalle + 'px'">Cumplió</h5>
                        <h5 :style="'font-size: ' + configuracion.detalle + 'px'">{{ cumplio }}</h5>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col>
                        <h5 :style="'font-size: ' + configuracion.detalle + 'px'">No Cumplió</h5>
                        <h5 :style="'font-size: ' + configuracion.detalle + 'px'">{{ no_cumplio }}</h5>
                    </v-col>
                </v-row>
            </v-card-text> -->
        </v-card>
    </div>
</template>

<script>
    export default {
        props: {
            titulo: {
                type: String,
                default: ""
            },
            cumplio: {
                type: Number,
                default: 0
            },
            no_cumplio: {
                type: Number,
                default: 0
            },
            porcentaje: {
                type: Number,
                default: 0
            },
            color: {
                type: String,
                default: ""
            },
            configuracion: {
                type: Object,
                default: null
            }
        },
        data(){
            return{

            }
        },
    }
</script>