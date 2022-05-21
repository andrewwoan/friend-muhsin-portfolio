import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "./Experience";

export default class Raycaster extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.render = this.experience.render;
        this.renderer = this.experience.renderer;
        this.controls = this.experience.controls;
        this.resources = this.experience.resources.items.gallery.scene.children;

        this.castedObjects = [];

        this.scene.children.forEach((child) => {
            if (child instanceof THREE.Group) {
                child.children.forEach((entry) => {
                    if (
                        entry.name === "picture" ||
                        entry.name === "picture1" ||
                        entry.name === "picture2" ||
                        entry.name === "picture3" ||
                        entry.name === "picture4" ||
                        entry.name === "picture5" ||
                        entry.name === "linkedin" ||
                        entry.name === "github" ||
                        entry.name === "email" ||
                        entry.name === "Cube097"
                    ) {
                        this.castedObjects.push(entry);
                    }
                });
                return true;
            }
            return false;
        });

        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        console.log("casted objects");

        console.log(this.castedObjects);

        this.menuBtn = document.querySelector(".menu-button");
        this.nav = document.querySelector(".nav-menu");
        this.content = document.querySelector(".content-wrapper");
        this.contentStuff = document.querySelector(".content");
        this.close = document.querySelector(".close");
        this.closeProj = document.querySelector(".close-project");
        this.one = document.querySelector(".one");
        this.two = document.querySelector(".two");
        this.three = document.querySelector(".three");
        this.four = document.querySelector(".four");
        this.five = document.querySelector(".five");
        this.six = document.querySelector(".six");
        this.seven = document.querySelector(".seven");

        this.setListeners();

        window.addEventListener("mousemove", this.onPointerMove.bind(this));
        window.addEventListener("mousedown", this.onPointerDown.bind(this));
        window.addEventListener("touchstart", this.onTouchStart.bind(this));
    }

    setListeners() {
        this.menuBtn.addEventListener("click", () => {
            this.nav.classList.toggle("hidden");
            this.content.classList.add("hidden");
            this.closeProj.classList.add("hidden");
        });

        this.close.addEventListener("click", () => {
            this.nav.classList.add("hidden");
            this.content.classList.add("hidden");
            this.closeProj.classList.add("hidden");
        });

        this.closeProj.addEventListener("click", () => {
            this.content.classList.add("hidden");
            this.closeProj.classList.add("hidden");
        });

        this.one.addEventListener("click", () => {
            this.content.classList.remove("hidden");
            this.nav.classList.add("hidden");
            this.closeProj.classList.remove("hidden");
            this.contentStuff.innerHTML = `
                <div class="title">Wabtec</div>
                <div class="date">Role: Intern | Summer 2021</div>
                
                <img src="./Textures/wabtec.jpg" alt="" class="work-img">
          
                <div class="description">In the summer of 2021, I worked for Wabtec Corporation as a Software Intern for 10 weeks at the GE Transportation plant in Erie. The Erie plant is dedicated to the design, manufacturing, maintenance, and modernization of locomotives. I interned for the Independent Test Team (ITT) to work on software tools to streamline locomotive testing.
                </div>
                <div class="description">My primary project was the development of an application to automatically run diagnostic tests for and receive data from a locomotive control system. I also created tools to to either populate or query databases for specific purposes. For each piece of software, I wrote extensive documentation. I was able to use some of the tools I made to run tests assigned to the ITT. </div >
                <div class="description">Apart from technical work, I developed my network and improved my communication and professional skills. I received a great deal of career advice from several other engineers and interns. I also participated in events hosted by Wabtec’s cultural forums. I made many friends both from the office and the intern housing location, and did something new every weekend. I’m very glad to have this experience, and would like to thank my team, assignment leaders, fellow interns, and Wabtec for an amazing summer.
                </div>
                <div class="tools">
                  <div class="title pad">Tools</div>
                  <ul class="tool-list">
                    <li class="tool-item">Visual Studio C#</li>
                    <ul class="tool-list">
                    <li class="tool-item">Npgsql</li>
                    <li class="tool-item">Interop Services
                    </li>
                    <li class="tool-item">.NET WinSCP
                    </li>
                  </ul> 
                    <li class="tool-item">WinSCP</li>
                    <li class="tool-item">Tera Term
                    </li>
                    <li class="tool-item">PostgreSQL</li>
                    <li class="tool-item">IBM Rational DOORS
                    </li>
                    <li class="tool-item">Microsoft Teams & Office
                    </li>
                  </ul> 
                `;
        });
        this.two.addEventListener("click", () => {
            this.content.classList.remove("hidden");
            this.closeProj.classList.remove("hidden");
            this.nav.classList.add("hidden");

            this.contentStuff.innerHTML = `
        <div class="title">FPGA 5-Stage Pipelined CPU
        </div>
        <div class="date">Role: Developer & Engineer | February - May 2021
        </div>
        
        <img src="./Textures/cpu.jpg" alt="" class="work-img">
  
        <div class="description">The FPGA 5-Stage Pipelined CPU project simulates a central processing unit through Verilog. It’s made of many different essential components, but they are organized in 5 stages to run as a looping state machine. There are three distinct memories: the instruction memory, the data memory, and the register file. Essential functionality lies in the Control Unit (Control) and the Arithmetic Logic Unit (ALU). This CPU iterates through the instruction memory line by line, fetching instructions and decoding them into switches using the Control. If math needs to be done, multiplexors are manipulated to send necessary signals to the ALU, whose output is directed as needed.

        </div>
        <div class="description">The defining feature of this CPU is the way it runs in a pipelined 5-step cycle. The first step is the Instruction Fetch (IF). This is when the instruction memory is stepped through and individual instructions are read and sent to the next phase. The second phase, Instruction Decode (ID) receives the instruction from IF and parses it into outgoing signals for other functional parts of the CPU. The ID stage also contains the Register File, to quickly load variables to send into the next stage. The next stage is the Execution (EXE) stage. The ALU resides in this stage, and receives signals from the Control to decide its operation and receives input values from the Register File’s output, sending the resulting calculation to the next stage. The next stage is the Memory Access (MEM) phase where the ALU output is either saved into the data memory or used to access data memory to be saved into the Register File for future use. The final phase, the Write Back (WB) phase, is where the output of the data memory or the ALU is saved to the register (depending on the instruction). These stages move forward every clock cycle, with an instruction being fetched every time. Up to five instructions can concurrently run at different stages, in an assembly line fashion. This design allows the hardware to be shared, giving it a high uptime.


        </div>
        <div class="description">Due to the separation of the five stages, some functions can’t be run immediately after each other, like arithmetic functions and loading and saving to data memory. Stalls, a blank instruction, are used to prevent this “data hazard”. By using forwarding, we can bypass these restrictions by building pipelines designed specifically for each instruction that wire the ALU output to the input of the next ALU operation, or wiring the output of the data memory into the ALU. I implemented this forwarding technique to reduce the necessary amount of stalls, significantly improving the CPU’s performance.


        </div>
        <div class="description">This project bridged the gap between basic logic gates and entire computers. I felt like I was building a computer from the ground up. Building this CPU ignited a passion for hardware that I hope to follow for the rest of my college years and into the start of my professional career. Even though I built this during the COVID-19 quarantine, I’m very thankful to Penn State’s EECS department for creating such a challenging but exciting experience for every student. This project is everything I want out of a university computer science curriculum.
        </div>
   
        <div class="tools">
          <div class="title pad">Tools</div>
          <ul class="tool-list">
            <li class="tool-item">Verilog
          </ul> 
        `;
        });
        this.three.addEventListener("click", () => {
            this.content.classList.remove("hidden");
            this.closeProj.classList.remove("hidden");
            this.nav.classList.add("hidden");

            this.contentStuff.innerHTML = `
            <div class="title">JBOD Disk Driver                </div>
            <div class="date">Role: Developer & Engineer | February - April 2021                </div>
            
            <img src="./Textures/jbod.jpg" alt="" class="work-img">
      
            <div class="description">JBOD Disk Driver is a system that converts a “Just a Bunch of Disks” disk drive into a “Redundant Array of Independent Disks”, where the bytes on a disk can be accessed as one massive byte array, and accessed efficiently using a look-aside cache. It’s also built to support a remote disk drive, constructing, sending, and receiving data packets over the net. Of the 300+ students, I achieved the 6th highest performing cached disk driver. I was given this assignment in my Introduction to Systems Programming class, and developed it over the course of the semester.


            </div>
            <div class="description">The JBOD disks are organized into 16 disks of 256 blocks of memory. We were given read and write functions which could access entire blocks of memory at a time. To navigate to a block, we were given “seek to disk” and “seek to block” functions. So, to write new data in a single block, I’d have to first navigate towards it, read the data into a temporary buffer, edit that buffer, and then write the buffer back into the JBOD disk drive.

            </div>
            <div class="description">The first task I was given was the conversion of the given JBOD disks into a massive array that we could easily write and read content from. I used a loop that would read/write into a temporary buffer, copy from/to it, and write blocks if needed, using conditionals to figure out when to utilize the seek function.

            </div>
            <div class="description">The second task was the implementation of a scan-resistant look-aside cache with a write-through write policy. A look-aside cache is a cache that is separate from the memory system, but can be used to store blocks temporarily to reduce the amount of time the JBOD disk must be accessed. A cache with a write-through write policy, upon writing to a block in the JBOD drive, will also write to the cache if that specific block is currently stored. A scan resistant cache splits the cache into two sections, one containing blocks that were accessed once, and another section that contains blocks accessed more than once to prevent a scan from entirely rewriting the cache.. The professor set up a class-wide competition for bonus points to minimize the amount of JBOD operations (write, read, seeking). In a class of 300+ students, my cache ended up ranking 6th. I spent hours on the optimization process, and developed a strong understanding of the utility of caches.

            </div>
            <div class="description">The third task was to create a JBOD network drive client to run JBOD operations on a remote JBOD disk drive, called the JBOD server. It involved sending and receiving packets of bytes containing either encoded instructions or byte data when reading or writing. The JBOD server would expect packets when receiving a write instruction and send packets either to confirm each instruction or after receiving a read instruction. I implemented the client by creating sockets connecting to the JBOD server’s port, constructing/sending packets, and reading incoming packets. Since this was my first project dealing directly with packets in the network, I learned a great deal about how many network systems work at the fundamental level.

            </div>
            <div class="tools">
              <div class="title pad">Tools</div>
              <ul class="tool-list">
                <li class="tool-item">C Programming Language
              </ul> 
            `;
        });
        this.four.addEventListener("click", () => {
            this.nav.classList.add("hidden");
            this.content.classList.remove("hidden");
            this.closeProj.classList.remove("hidden");
            this.contentStuff.innerHTML = `
        <div class="title">5th Sense</div>
        <div class="date">Role: Developer | February - April 2021</div>
        
        <img src="./Textures/sense.jpg" alt="" class="work-img">
        <div class="links">
            <a href="#" class="source">Source Code</a>
            <a href="#" class="source">Live</a>
        </div>

        <div class="description">5th Sense is a real-time transcription mobile app which aims to separate text from speakers into a group-chat format. Our team submitted our app during the 2021 Nittany AI Challenge, finishing in the semi-finals (prototype phase) with 20 teams left. The application uses Microsoft Azure’s Speech-To-Text Recognizer API combined with their Speaker Identification API to simultaneously transcribe and identify speech. It’s constructed using React-Native, with JavaScript objects storing speech audio segments to identify and speech profiles to help identify the segments for classification. We planned to store this information in a phone using Firebase, but we just used the browser memory for this demo. The components come together to have real-time audio collection and speaker profile training while updating the front-end to display the labeled text from different speakers in a text message format.
        </div>

        <div class="tools">
            <div class="title pad">Tools</div>
            <ul class="tool-list">
                <li class="tool-item">JavaScript</li>
                <ul class="tool-list">
                <li class="tool-item">NPM & Node
                </li>
                <li class="tool-item">React Native
                </li>
                </ul>
                <li class="tool-item">Microsoft Azure                        </li>
                <ul class="tool-list">
                <li class="tool-item">Speaker Identification
                </li>
                <li class="tool-item">Speech Recognizer
                </li>
                </ul>
            </ul>
        </div>
        `;
        });
        this.five.addEventListener("click", () => {
            this.nav.classList.add("hidden");
            this.content.classList.remove("hidden");
            this.closeProj.classList.remove("hidden");
            this.contentStuff.innerHTML = `
            <div class="title">OpenVessel</div>
            <div class="date">Role: Intern | Summer 2020</div>
            
            <img src="./Textures/vessel.jpg" alt="" class="work-img">

            <div class="description">OpenVessel is a startup that implements frameworks for machine learning on CT scans. I worked with OpenVessel's amazing team for three full months to build the prototype, from early June to when college resumed in August. In this time, I learned to implement a NodeJS environment and a routing framework into a full stack web application. Using this foundation, I constructed a 3D renderer for VTK files. Our prototype went on to win a $5000 grant from the Nittany AI Challenge. </div >
            <div class="description">Working on this cutting edge product was especially difficult since open source tools combining web applications and medical data formats are relatively new and weakly documented. I found success in carving my own path by testing various libraries and building my products on an isolated environment mimicking the app's structure.
            </div>

            <div class="description">Not only have I developed my skills, but also the important aspects of collaboration that drives a team to move forward. I would like to give my thanks to Rishyak, Leslie, Greg, and the rest of the OpenVessel team for bringing out my best, and to Brad Zdenek for running such a great contest.
            </div>

            <div class="tools">
                <div class="title pad">Tools</div>
                <ul class="tool-list">
                    <li class="tool-item">JavaScript</li>
                    <li class="tool-item">ECMAScript</li>
                    <ul class="tool-list">
                    <li class="tool-item">NPM & Node
                    </li>
                    <li class="tool-item">ReactJS</li>
                    <li class="tool-item">Webpack</li>
                    <li class="tool-item">VTK.js</li>
                    </ul>
                    <li class="tool-item">Python</li>
                    <ul class="tool-list">
                    <li class="tool-item">Flask
                    </li>
                    </ul>
                </ul>
            </div>
            `;
        });
        this.six.addEventListener("click", () => {
            this.nav.classList.add("hidden");
            this.content.classList.remove("hidden");
            this.closeProj.classList.remove("hidden");
            this.contentStuff.innerHTML = `
            <div class="title">Muhsin Wahi-Anwar
            </div>
            <div class="date">Software Developer at Capital One
            </div>
            
            <img src="./Textures/profilepic.jpg" alt="" class="work-img">
      
            <div class="description">I am a student at Penn State minoring in Physics and Math. I'm also a tutor and I run weekly DS/A discussions. If you'd like to know more about my current status, see my LinkedIn.


            </div>
            <div class="description">I enjoy programming a lot. From web applications, to automation tools, to AI, to systems programming, I have been fortunate to work with many different fields. You can see some of my recent work around the 3D world (or by the menu).



            </div>
            <div class="description">My career goal is to become an expert and use my knowledge to help other software engineers. My mission is to contribute to long-term sustainability for future generations.

            </div>
            <div class="description">I also like to make illustrations in my free time. There's a gallery down below displaying my favorite pieces. Additionally, I enjoy drinking boba, hiking, hanging out with friends and family, and gaming on the Switch. I hope you enjoy exploring my portfolio!
            </div>
       
            <div class="gallery">
              <div class="title pad">My Art</div>
              <img src="./svgs/CharcoalLandscape.jpg" alt="" class="work-img">
              <img src="./svgs/CharcoalStillLife.jpg" alt="" class="work-img">
              <img src="./svgs/CityScapeDrawing.jpg" alt="" class="work-img">
              <img src="./svgs/ClothesSketches.jpg" alt="" class="work-img">
              <img src="./svgs/ContourGridBottle.jpg" alt="" class="work-img">
              <img src="./svgs/ContourVerticalBottle.jpg" alt="" class="work-img">
              <img src="./svgs/CurtainsInPen.jpg" alt="" class="work-img">
              <img src="./svgs/MirrorInPen.jpg" alt="" class="work-img">
              <img src="./svgs/NoseSketches.jpg" alt="" class="work-img">
              <img src="./svgs/ObjectsInPen.jpg" alt="" class="work-img">
              <img src="./svgs/PencilCube.jpg" alt="" class="work-img">
              <img src="./svgs/PencilCylinder.jpg" alt="" class="work-img">
              <img src="./svgs/PencilSphere.jpg" alt="" class="work-img">
              <img src="./svgs/PlantNegativeSpace.jpg" alt="" class="work-img">

            </div>`;
        });
        this.seven.addEventListener("click", () => {
            this.nav.classList.add("hidden");
            this.content.classList.remove("hidden");
            this.closeProj.classList.remove("hidden");
            this.contentStuff.innerHTML = `
            <div class="title">Credits
            </div>
            <li><a href="https://www.crossyroad.com/" target="_blank" rel="noopener noreferrer">[LINK] Theme inspired by Crossy Road </a></li>
            <li><a href="https://bruno-simon.com/" target="_blank" rel="noopener noreferrer">[LINK] Idea inspired by Bruno Simon's Portfolio</a></li>
            <li><a href="https://threejs-journey.xyz/" target="_blank" rel="noopener noreferrer">[LINK] Check out Bruno's course to learn how to make awesome websites</a></li>
            <div class="title">Technology Used
            </div>
            <li><a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">[LINK] Figma - Design of portfolio and used to create SVGs </a></li>
            <li><a href="https://www.blender.org/" target="_blank" rel="noopener noreferrer">[LINK] Blender - Used to create 3D models</a></li>
            <li><a href="https://threejs.org/" target="_blank" rel="noopener noreferrer">[LINK] Three.js - JavaScript Library for WebGL</a></li>
             `;
        });
    }

    onTouchStart(event) {
        this.pointer.x = (event.touches[0].clientX / this.sizes.width) * 2 - 1;
        this.pointer.y =
            -(event.touches[0].clientY / this.sizes.height) * 2 + 1;
    }

    onPointerMove = (event) => {
        this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1;
        this.pointer.y = -(event.clientY / this.sizes.height) * 2 + 1;
    };

    onPointerDown = (event) => {
        console.log(this.intersectionObject);
        if (this.intersectionObject) {
            if (this.intersectionObject.object.name === "linkedin") {
                window.open("https://www.linkedin.com/in/muhsinwahi/");
            } else if (this.intersectionObject.object.name === "email") {
                window.open("mailto:muhsin.wahianwar@gmail.com");
            } else if (this.intersectionObject.object.name === "github") {
                window.open("https://github.com/giwl-21");
            } else if (this.intersectionObject.object.name === "picture") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
                <div class="title">OpenVessel</div>
                <div class="date">Role: Intern | Summer 2020</div>
                
                <img src="./Textures/vessel.jpg" alt="" class="work-img">

                <div class="description">OpenVessel is a startup that implements frameworks for machine learning on CT scans. I worked with OpenVessel's amazing team for three full months to build the prototype, from early June to when college resumed in August. In this time, I learned to implement a NodeJS environment and a routing framework into a full stack web application. Using this foundation, I constructed a 3D renderer for VTK files. Our prototype went on to win a $5000 grant from the Nittany AI Challenge. </div >
                <div class="description">Working on this cutting edge product was especially difficult since open source tools combining web applications and medical data formats are relatively new and weakly documented. I found success in carving my own path by testing various libraries and building my products on an isolated environment mimicking the app's structure.
                </div>

                <div class="description">Not only have I developed my skills, but also the important aspects of collaboration that drives a team to move forward. I would like to give my thanks to Rishyak, Leslie, Greg, and the rest of the OpenVessel team for bringing out my best, and to Brad Zdenek for running such a great contest.
                </div>

                <div class="tools">
                    <div class="title pad">Tools</div>
                    <ul class="tool-list">
                        <li class="tool-item">JavaScript</li>
                        <li class="tool-item">ECMAScript</li>
                        <ul class="tool-list">
                        <li class="tool-item">NPM & Node
                        </li>
                        <li class="tool-item">ReactJS</li>
                        <li class="tool-item">Webpack</li>
                        <li class="tool-item">VTK.js</li>
                        </ul>
                        <li class="tool-item">Python</li>
                        <ul class="tool-list">
                        <li class="tool-item">Flask
                        </li>
                        </ul>
                    </ul>
                </div>
                `;
            } else if (this.intersectionObject.object.name === "picture1") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
                <div class="title">5th Sense</div>
                <div class="date">Role: Developer | February - April 2021</div>
                
                <img src="./Textures/sense.jpg" alt="" class="work-img">
                <div class="links">
                    <a href="#" class="source">Source Code</a>
                    <a href="#" class="source">Live</a>
                </div>
        
                <div class="description">5th Sense is a real-time transcription mobile app which aims to separate text from speakers into a group-chat format. Our team submitted our app during the 2021 Nittany AI Challenge, finishing in the semi-finals (prototype phase) with 20 teams left. The application uses Microsoft Azure’s Speech-To-Text Recognizer API combined with their Speaker Identification API to simultaneously transcribe and identify speech. It’s constructed using React-Native, with JavaScript objects storing speech audio segments to identify and speech profiles to help identify the segments for classification. We planned to store this information in a phone using Firebase, but we just used the browser memory for this demo. The components come together to have real-time audio collection and speaker profile training while updating the front-end to display the labeled text from different speakers in a text message format.
                </div>

                <div class="tools">
                    <div class="title pad">Tools</div>
                    <ul class="tool-list">
                        <li class="tool-item">JavaScript</li>
                        <ul class="tool-list">
                        <li class="tool-item">NPM & Node
                        </li>
                        <li class="tool-item">React Native
                        </li>
                        </ul>
                        <li class="tool-item">Microsoft Azure                        </li>
                        <ul class="tool-list">
                        <li class="tool-item">Speaker Identification
                        </li>
                        <li class="tool-item">Speech Recognizer
                        </li>
                        </ul>
                    </ul>
                </div>
                `;
            } else if (this.intersectionObject.object.name === "picture2") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
                <div class="title">Wabtec</div>
                <div class="date">Role: Intern | Summer 2021</div>
                
                <img src="./Textures/wabtec.jpg" alt="" class="work-img">
          
                <div class="description">In the summer of 2021, I worked for Wabtec Corporation as a Software Intern for 10 weeks at the GE Transportation plant in Erie. The Erie plant is dedicated to the design, manufacturing, maintenance, and modernization of locomotives. I interned for the Independent Test Team (ITT) to work on software tools to streamline locomotive testing.
                </div>
                <div class="description">My primary project was the development of an application to automatically run diagnostic tests for and receive data from a locomotive control system. I also created tools to to either populate or query databases for specific purposes. For each piece of software, I wrote extensive documentation. I was able to use some of the tools I made to run tests assigned to the ITT. </div >
                <div class="description">Apart from technical work, I developed my network and improved my communication and professional skills. I received a great deal of career advice from several other engineers and interns. I also participated in events hosted by Wabtec’s cultural forums. I made many friends both from the office and the intern housing location, and did something new every weekend. I’m very glad to have this experience, and would like to thank my team, assignment leaders, fellow interns, and Wabtec for an amazing summer.
                </div>
                <div class="tools">
                  <div class="title pad">Tools</div>
                  <ul class="tool-list">
                    <li class="tool-item">Visual Studio C#</li>
                    <ul class="tool-list">
                    <li class="tool-item">Npgsql</li>
                    <li class="tool-item">Interop Services
                    </li>
                    <li class="tool-item">.NET WinSCP
                    </li>
                  </ul> 
                    <li class="tool-item">WinSCP</li>
                    <li class="tool-item">Tera Term
                    </li>
                    <li class="tool-item">PostgreSQL</li>
                    <li class="tool-item">IBM Rational DOORS
                    </li>
                    <li class="tool-item">Microsoft Teams & Office
                    </li>
                  </ul> 
                `;
            } else if (this.intersectionObject.object.name === "picture3") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
                <div class="title">JBOD Disk Driver                </div>
                <div class="date">Role: Developer & Engineer | February - April 2021                </div>
                
                <img src="./Textures/jbod.jpg" alt="" class="work-img">
          
                <div class="description">JBOD Disk Driver is a system that converts a “Just a Bunch of Disks” disk drive into a “Redundant Array of Independent Disks”, where the bytes on a disk can be accessed as one massive byte array, and accessed efficiently using a look-aside cache. It’s also built to support a remote disk drive, constructing, sending, and receiving data packets over the net. Of the 300+ students, I achieved the 6th highest performing cached disk driver. I was given this assignment in my Introduction to Systems Programming class, and developed it over the course of the semester.


                </div>
                <div class="description">The JBOD disks are organized into 16 disks of 256 blocks of memory. We were given read and write functions which could access entire blocks of memory at a time. To navigate to a block, we were given “seek to disk” and “seek to block” functions. So, to write new data in a single block, I’d have to first navigate towards it, read the data into a temporary buffer, edit that buffer, and then write the buffer back into the JBOD disk drive.

                </div>
                <div class="description">The first task I was given was the conversion of the given JBOD disks into a massive array that we could easily write and read content from. I used a loop that would read/write into a temporary buffer, copy from/to it, and write blocks if needed, using conditionals to figure out when to utilize the seek function.

                </div>
                <div class="description">The second task was the implementation of a scan-resistant look-aside cache with a write-through write policy. A look-aside cache is a cache that is separate from the memory system, but can be used to store blocks temporarily to reduce the amount of time the JBOD disk must be accessed. A cache with a write-through write policy, upon writing to a block in the JBOD drive, will also write to the cache if that specific block is currently stored. A scan resistant cache splits the cache into two sections, one containing blocks that were accessed once, and another section that contains blocks accessed more than once to prevent a scan from entirely rewriting the cache.. The professor set up a class-wide competition for bonus points to minimize the amount of JBOD operations (write, read, seeking). In a class of 300+ students, my cache ended up ranking 6th. I spent hours on the optimization process, and developed a strong understanding of the utility of caches.

                </div>
                <div class="description">The third task was to create a JBOD network drive client to run JBOD operations on a remote JBOD disk drive, called the JBOD server. It involved sending and receiving packets of bytes containing either encoded instructions or byte data when reading or writing. The JBOD server would expect packets when receiving a write instruction and send packets either to confirm each instruction or after receiving a read instruction. I implemented the client by creating sockets connecting to the JBOD server’s port, constructing/sending packets, and reading incoming packets. Since this was my first project dealing directly with packets in the network, I learned a great deal about how many network systems work at the fundamental level.

                </div>
                <div class="tools">
                  <div class="title pad">Tools</div>
                  <ul class="tool-list">
                    <li class="tool-item">C Programming Language
                  </ul> 
                `;
            } else if (this.intersectionObject.object.name === "picture4") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
                <div class="title">FPGA 5-Stage Pipelined CPU
                </div>
                <div class="date">Role: Developer & Engineer | February - May 2021
                </div>
                
                <img src="./Textures/cpu.jpg" alt="" class="work-img">
          
                <div class="description">The FPGA 5-Stage Pipelined CPU project simulates a central processing unit through Verilog. It’s made of many different essential components, but they are organized in 5 stages to run as a looping state machine. There are three distinct memories: the instruction memory, the data memory, and the register file. Essential functionality lies in the Control Unit (Control) and the Arithmetic Logic Unit (ALU). This CPU iterates through the instruction memory line by line, fetching instructions and decoding them into switches using the Control. If math needs to be done, multiplexors are manipulated to send necessary signals to the ALU, whose output is directed as needed.

                </div>
                <div class="description">The defining feature of this CPU is the way it runs in a pipelined 5-step cycle. The first step is the Instruction Fetch (IF). This is when the instruction memory is stepped through and individual instructions are read and sent to the next phase. The second phase, Instruction Decode (ID) receives the instruction from IF and parses it into outgoing signals for other functional parts of the CPU. The ID stage also contains the Register File, to quickly load variables to send into the next stage. The next stage is the Execution (EXE) stage. The ALU resides in this stage, and receives signals from the Control to decide its operation and receives input values from the Register File’s output, sending the resulting calculation to the next stage. The next stage is the Memory Access (MEM) phase where the ALU output is either saved into the data memory or used to access data memory to be saved into the Register File for future use. The final phase, the Write Back (WB) phase, is where the output of the data memory or the ALU is saved to the register (depending on the instruction). These stages move forward every clock cycle, with an instruction being fetched every time. Up to five instructions can concurrently run at different stages, in an assembly line fashion. This design allows the hardware to be shared, giving it a high uptime.


                </div>
                <div class="description">Due to the separation of the five stages, some functions can’t be run immediately after each other, like arithmetic functions and loading and saving to data memory. Stalls, a blank instruction, are used to prevent this “data hazard”. By using forwarding, we can bypass these restrictions by building pipelines designed specifically for each instruction that wire the ALU output to the input of the next ALU operation, or wiring the output of the data memory into the ALU. I implemented this forwarding technique to reduce the necessary amount of stalls, significantly improving the CPU’s performance.


                </div>
                <div class="description">This project bridged the gap between basic logic gates and entire computers. I felt like I was building a computer from the ground up. Building this CPU ignited a passion for hardware that I hope to follow for the rest of my college years and into the start of my professional career. Even though I built this during the COVID-19 quarantine, I’m very thankful to Penn State’s EECS department for creating such a challenging but exciting experience for every student. This project is everything I want out of a university computer science curriculum.
                </div>
           
                <div class="tools">
                  <div class="title pad">Tools</div>
                  <ul class="tool-list">
                    <li class="tool-item">Verilog
                  </ul> 
                </div>
                `;
            } else if (this.intersectionObject.object.name === "picture5") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
                <div class="title">Muhsin Wahi-Anwar
                </div>
                <div class="date">Software Developer at Capital One
                </div>
                
                <img src="./Textures/profilepic.jpg" alt="" class="work-img">
          
                <div class="description">I am a student at Penn State minoring in Physics and Math. I'm also a tutor and I run weekly DS/A discussions. If you'd like to know more about my current status, see my LinkedIn.


                </div>
                <div class="description">I enjoy programming a lot. From web applications, to automation tools, to AI, to systems programming, I have been fortunate to work with many different fields. You can see some of my recent work around the 3D world (or by the menu).



                </div>
                <div class="description">My career goal is to become an expert and use my knowledge to help other software engineers. My mission is to contribute to long-term sustainability for future generations.

                </div>
                <div class="description">I also like to make illustrations in my free time. There's a gallery down below displaying my favorite pieces. Additionally, I enjoy drinking boba, hiking, hanging out with friends and family, and gaming on the Switch. I hope you enjoy exploring my portfolio!
                </div>
           
                <div class="gallery">
                  <div class="title pad">My Art</div>
                  <img src="./svgs/CharcoalLandscape.jpg" alt="" class="work-img">
                  <img src="./svgs/CharcoalStillLife.jpg" alt="" class="work-img">
                  <img src="./svgs/CityScapeDrawing.jpg" alt="" class="work-img">
                  <img src="./svgs/ClothesSketches.jpg" alt="" class="work-img">
                  <img src="./svgs/ContourGridBottle.jpg" alt="" class="work-img">
                  <img src="./svgs/ContourVerticalBottle.jpg" alt="" class="work-img">
                  <img src="./svgs/CurtainsInPen.jpg" alt="" class="work-img">
                  <img src="./svgs/MirrorInPen.jpg" alt="" class="work-img">
                  <img src="./svgs/NoseSketches.jpg" alt="" class="work-img">
                  <img src="./svgs/ObjectsInPen.jpg" alt="" class="work-img">
                  <img src="./svgs/PencilCube.jpg" alt="" class="work-img">
                  <img src="./svgs/PencilCylinder.jpg" alt="" class="work-img">
                  <img src="./svgs/PencilSphere.jpg" alt="" class="work-img">
                  <img src="./svgs/PlantNegativeSpace.jpg" alt="" class="work-img">

                </div>`;
            } else if (this.intersectionObject.object.name === "Cube097") {
                this.content.classList.remove("hidden");
                this.closeProj.classList.remove("hidden");
                this.contentStuff.innerHTML = `
            <div class="title">Credits
            </div>
            <li><a href="https://www.crossyroad.com/" target="_blank" rel="noopener noreferrer">[LINK] Theme inspired by Crossy Road </a></li>
            <li><a href="https://bruno-simon.com/" target="_blank" rel="noopener noreferrer">[LINK] Idea inspired by Bruno Simon's Portfolio</a></li>
            <div class="title">Technology Used
            </div>
            <li><a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">[LINK] Figma - Design of portfolio and used to create SVGs </a></li>
            <li><a href="https://www.blender.org/" target="_blank" rel="noopener noreferrer">[LINK] Blender - Used to create 3D models</a></li>
            <li><a href="https://threejs.org/" target="_blank" rel="noopener noreferrer">[LINK] Three.js - JavaScript Library for WebGL</a></li>
             `;
            }
        }
    };

    update() {
        // console.log(this.camera.camera.position);
        this.raycaster.setFromCamera(this.pointer, this.camera.camera);
        // console.log(this.castedObjects);

        const intersectedObjects = this.raycaster.intersectObjects(
            this.castedObjects
        );

        if (intersectedObjects.length) {
            if (!this.intersectionObject) {
                // console.log("mouse enter");
            }
            this.intersectionObject = intersectedObjects[0];
            this.canvas.style.cursor = "pointer";
        } else {
            if (this.intersectionObject) {
                // console.log("mouse leave");
            }
            this.canvas.style.cursor = "default";

            this.intersectionObject = null;
        }
    }
}
