const gallery = require("./../classes/gallery");
const galleryTimer = require("./../classes/timer");

const sketchP5 = require("./../js/p5.normal");
const sketchP5Posterize = require("./../js/p5.posterize");
module.exports = (Vue) => {
        const PreConfig = 
        { 
            template: `
                <div id="preConfig">
                    <div class="card">
                        <div class="card-body">
                            <input placeholder="Seleccionar Carpeta" type="file" id="pathFolder" ref="pathFolder" v-on:change="changePathFolder" webkitdirectory directory >
                            <button class="btn btn-sm btn-primary" v-on:click="selectPathFolder">Seleccionar Carpeta</button>
                            <div v-if="imagesArray.length !== 0" style="text-align:center;">
                                <span>Selecting {{imagesArray.length}} images</span>
                            </div>
                            <div style="margin-top:20px;">
                                <span>Seconds for pose</span>
                                <input type="number" v-model="seconds" class="form-control" min="30">
                            </div>
                            <button style="margin-top:20px" class="btn btn-success active" @click="start" :disabled="imagesArray.length === 0" >Start</button>
                        </div>
                    </div>
                </div>
            `, 
            data: function(){ 
                return { imagesArray: gallery.originalImages, seconds:30}
            },
            
            methods:{
                start: function(){
                    gallery.config.seconds = this.seconds;
                    this.$router.push('/imagesSession')
                },
                selectPathFolder: function(){
                    this.$refs.pathFolder.click()
                },
                changePathFolder: function(e){
                    gallery.loadImages(Array.from(e.target.files));
                    this.imagesArray = gallery.originalImages;
                }
            }
        }
        const Session = { 
            template: `
            <div id="sessionContainer">
                <div id="sessionConfigurations">
            
                    <div id="sessionTimer" style="text-align:center">
                        <h1 id="counterTimer" style="font-size:4em;">00</h1>
                    </div>
            
                    <div id="sessionTimerButtons" class="align ">
                        <input type="button" class="btn btn-primary btn-sm" @click="back" id="previousImage" value="<">
                        <input type="button" class="btn btn-primary btn-sm" @click="pause" id="pauseImage" value="pause">
                        <input type="button" class="btn btn-primary btn-sm" @click="next" id="nextImage" value=">">
                    </div>
                    
                    <div id="sessionTimerPosterize" style="margin-top:10px;">
                        <div class="align align--between">
                            <label for="posterize">Posterize</label>
                            <input type="checkbox" class="" name="posterize" id="posterize"  v-model="posterize">
                        </div>
                        
            
                        <div class="align align--between">
                            <label for="posterize">Gray</label>
                            <input type="checkbox" name="gray" id="gray" v-model="gray">
                        </div>
            
                        <div class="align align--between">
                            <label for="blur">Blur</label>
                            <input type="checkbox" name="gray" id="blur" v-model="blur">
                        </div>
                        
                        <div>
                            <span>Levels</span>
                            <input type="number" id="levels" min="2" max="255" value="2" class="form-control" v-model="levels">
                        </div>

                        <div style="text-align:center; margin-top:10px;" @click="closeSession">
                            <router-link to="/"> Close Session </router-link>
                        </div>
                        
                    </div>
            
                </div>
            
                <div id="canvasContainers">
                    <div id="canvasContainer"></div>
                    <div id="canvasContainerPosterize" v-if="posterize"></div>
                </div>
            </div>
            `, 
            data: function(){ 
                return {
                    posterize:false,
                    levels: gallery.config.levels,
                    blur: gallery.config.blur,
                    gray: gallery.config.gray
                }
            },
            methods:{
                closeSession: function(){
                    gallery.finishSession();
                },
                back:function(){
                    gallery.previous();
                },
                next:function(){
                    gallery.next();
                },
                pause:function(){
                    galleryTimer.pause();
                }
            },
            mounted:function(){
                new p5(sketchP5)
                gallery.start();
                galleryTimer.start(gallery.config.seconds);
            }, 
            watch:{
                posterize: function(val){
                   gallery.config.posterize = val;
                   if(val)
                   {
                        setTimeout(() => {
                            new p5(sketchP5Posterize);
                        }, 500);
                   }
                },
                gray: function(val){
                    
                    gallery.config.gray = val;
                 },
                blur: function(val){
                
                    gallery.config.blur = val;
                },
                levels: function(val){
                    gallery.config.levels = val;
                }
            }
        }

        const routes = [
            { path: '/', component: PreConfig },
            { path: '/imagesSession', component: Session }
        ]
        
        const router = new VueRouter({routes});
        
        new Vue({
            router
        }).$mount('#app')
};