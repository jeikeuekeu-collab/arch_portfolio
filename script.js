// Architectural Portfolio Data & Logic
const projectsData = [
    {
        id: 1,
        title: "ORBIT : Centripetal Force of Coexistence",
        subTitle: "공존의 구심력",
        category: "residential",
        year: "2025.Fall (1학년 2학기)",
        location: "경기도 성남시 수정구 창곡동 591번지",
        area: "대지면적 286.30 ㎡ / 연면적 225.28 ㎡ / 지상 2층",
        structure: "재료 — Red Brick, 영롱쌓기(Honeycomb Screen) 이중 외피",
        concept: "오늘날의 가족은 혈연을 넘어 '관계의 지속성'으로 확장되고 있다. 본 프로젝트는 서로 다른 궤적을 그려온 30대 4인이 타인에서 우리가 되어가는 과정을 담는 건축적 그릇이다. 우리는 이들이 지속 가능한 유대를 맺기 위해 필요한 것은 억지스러운 통합이 아니라, 서로를 강력하게 끌어당기는 구심점(Core)이라고 정의했다. 이 집은 단순한 거주 공간을 넘어, 흩어지려는 개인들을 안으로 당기는 건축적 중력 장치이다.",
        images: [
            "projects/orbit/images/00_cover_render.jpg",
            "projects/orbit/images/30_render_sunken_living.jpg"
        ],
        detailUrl: "projects/orbit/index.html"
    },
    {
        id: 2,
        title: "LANDSCAPE OF COEXISTENCE : 공존의 풍경화",
        subTitle: "각자의 공간, 하나의 지붕",
        category: "public",
        year: "2026.Fall / 2학년 2학기",
        location: "경기도 성남시 분당구 정자동 219-1, 219-2",
        area: "대지 1,448.0㎡ / 지하 1층 · 지상 4층 / 지하 1,254㎡",
        structure: "철근콘크리트조 · 곡면 금속지붕",
        concept: "섞는 대신, 같은 풍경을 바라보게. 인사할 의무 없는 거리에서 같은 풍경을 겪는다 (약 8~13m). 배제 대신, 거리를 각자 고른다. 네 세대가 같은 나무를 바라보는 소규모 복합문화시설.",
        images: [
            "projects/coexistence/images/11b_section_EE.jpg",
            "projects/coexistence/images/05_site_plan.jpg"
        ],
        detailUrl: "projects/coexistence/index.html"
    }
];

// --- 1. Project Modal Logic ---
function openProjectModal(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;

    const modalBody = document.getElementById('modal-content-body');
    modalBody.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <span style="color: var(--accent); font-size: 0.85rem; font-weight: 600;">${project.category.toUpperCase()} | ${project.year}</span>
            <h2 style="font-family: var(--font-heading); font-size: 2rem; margin: 0.4rem 0 1rem 0;">${project.title}</h2>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); padding: 1.2rem; border-radius: var(--radius-sm); border: 1px solid var(--border);">
            <div><strong>대지위치:</strong> <span style="color: var(--text-secondary);">${project.location}</span></div>
            <div><strong>규모/면적:</strong> <span style="color: var(--text-secondary);">${project.area}</span></div>
            <div style="grid-column: span 2;"><strong>구조 및 재료:</strong> <span style="color: var(--text-secondary);">${project.structure}</span></div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 0.5rem; color: var(--accent);">설계 개념 (Design Statement)</h4>
            <p style="color: var(--text-secondary); line-height: 1.8;">${project.concept}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
            <h4 style="margin-bottom: 0.2rem; color: var(--accent);">주요 렌더링 및 다이어그램</h4>
            ${project.images.map(img => `<img src="${img}" style="width: 100%; border-radius: 8px; border: 1px solid var(--border);" loading="lazy">`).join('')}
        </div>
        
        <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <a href="${project.detailUrl || '#'}" class="btn-primary" style="display: inline-flex; text-decoration: none;">
                전체 프로젝트 보기 →
            </a>
            <a href="#design-rationale" class="btn-secondary" onclick="closeProjectModal()" style="display: inline-flex; text-decoration: none;">
                <span class="sparkle">✦</span> 관점별 핵심 설계 해설 보기 ↗
            </a>
        </div>
    `;

    document.getElementById('project-modal').classList.add('show');
}

function closeProjectModal(e) {
    if (!e || e.target.id === 'project-modal' || e.target.classList.contains('btn-close') || e.target.tagName === 'A') {
        document.getElementById('project-modal').classList.remove('show');
    }
}

// --- 2. Filter Button Logic ---
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- 3. Three.js Interactive 3D Massing Viewer ---
let scene, camera, renderer, controls, massGroup;
const isWireframe = false;
let isRotating = false;
let isCustomModelLoaded = false;
let modelScale = 1;
let modelBaseY = 0;
const sectionPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1000);

function initThreeViewer() {
    const container = document.getElementById('three-canvas-wrap');
    if (!container) return;

    // Scene & Camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(24, 18, 26);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.localClippingEnabled = true;
    container.appendChild(renderer.domElement);

    // OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(20, 35, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.35);
    dirLight2.position.set(-20, 15, -20);
    scene.add(dirLight2);

    // Architectural Ground Grid
    const gridHelper = new THREE.GridHelper(50, 50, 0x5eead4, 0x222a35);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Create ORBIT Conceptual Masses: 가운데 원통(CORE) + 둘레 원형 링(LOOP) + 네 방향 상자 4개(Room 1–4) + NEXUS + Screen
    massGroup = new THREE.Group();

    const clayMaterial = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.35,
        metalness: 0.1
    });

    const brickMaterial = new THREE.MeshStandardMaterial({
        color: 0xb45309,
        roughness: 0.7,
        metalness: 0.05
    });

    const loopMaterial = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.4,
        metalness: 0.1
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x5eead4,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
        transmission: 0.6
    });

    // 1. CORE (Sunken Living): 대지 중앙 원통
    const core = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 1.6, 32), clayMaterial);
    core.position.set(0, 0.8, 0);
    core.castShadow = true;
    core.receiveShadow = true;
    core.name = 'core';
    massGroup.add(core);

    // 2. LOOP (1.4m Circulation Loop): 둘레 순환 링
    const loop = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 7.2, 2.8, 32, 1, true), loopMaterial);
    loop.position.set(0, 1.4, 0);
    loop.name = 'loop';
    massGroup.add(loop);

    // 3. NEXUS (Void & Atrium): 1~2층 수직 관통 아트리움
    const nexus = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 4.5, 32), glassMaterial);
    nexus.position.set(0, 3.25, 0);
    nexus.name = 'nexus';
    massGroup.add(nexus);

    // 4. Brick Screen (영롱쌓기): 2층 도로변 벽돌 이중 외피 스크린
    const screen = new THREE.Mesh(new THREE.BoxGeometry(9.0, 3.0, 0.4), brickMaterial);
    screen.position.set(0, 4.5, 6.8);
    screen.name = 'screen';
    massGroup.add(screen);

    // 5. 네 방향 상자 4개 (Room 1 ~ 4)
    const roomGeo = new THREE.BoxGeometry(4.2, 3.2, 4.2);
    const roomPositions = [
        [-6.5, 1.6, 0],
        [6.5, 1.6, 0],
        [0, 1.6, -6.5],
        [0, 1.6, 6.5]
    ];
    roomPositions.forEach((pos, idx) => {
        const room = new THREE.Mesh(roomGeo, clayMaterial);
        room.position.set(pos[0], pos[1], pos[2]);
        room.castShadow = true;
        room.receiveShadow = true;
        room.name = `room_${idx + 1}`;
        massGroup.add(room);
    });

    scene.add(massGroup);

    // Resize Handler
    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Animate Loop
    function animate() {
        requestAnimationFrame(animate);
        if (isRotating && massGroup) {
            massGroup.rotation.y += 0.005;
        }
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // Button Events
    document.getElementById('btn-mode-rotate').addEventListener('click', function() {
        isRotating = !isRotating;
        this.classList.toggle('active', isRotating);
        this.innerText = isRotating ? 'Auto Rotate OFF' : 'Auto Rotate ON';
    });

    document.getElementById('btn-mode-reset').addEventListener('click', function() {
        if (isCustomModelLoaded) {
            controls.target.set(0, 2.87, 0);
            camera.position.set(20, 12.87, 22);
        } else {
            camera.position.set(24, 18, 26);
            controls.target.set(0, 3, 0);
        }
        controls.update();
        if (massGroup) massGroup.rotation.y = 0;
        setSectionCut('all');
        resetMassHighlight();
    });

    // Check if user has a custom gltf/glb file in models/ folder
    loadStaticGltfIfExists('models/building.glb');
}

// 3-1. Section Cut Logic (Clipping Plane)
function enableSectionControls(enabled = true) {
    document.querySelectorAll('.section-btn').forEach(btn => btn.disabled = !enabled);
    const slider = document.getElementById('sec-slider');
    if (slider) slider.disabled = !enabled;
}

function setSectionCut(heightOrMode) {
    const heightValEl = document.getElementById('sec-height-val');
    const sliderEl = document.getElementById('sec-slider');
    document.querySelectorAll('.section-btn').forEach(btn => btn.classList.remove('active'));

    if (heightOrMode === 'all') {
        sectionPlane.constant = 1000;
        if (heightValEl) heightValEl.innerText = "자르지 않음";
        if (sliderEl) sliderEl.value = 6.5;
        const btnAll = document.getElementById('btn-sec-all');
        if (btnAll) btnAll.classList.add('active');
    } else {
        const h = parseFloat(heightOrMode);
        sectionPlane.constant = modelBaseY + h * modelScale;
        if (heightValEl) heightValEl.innerText = `자르는 높이 ${h.toFixed(1)} m`;
        if (sliderEl) sliderEl.value = h;

        if (Math.abs(h - 6.0) < 0.05) {
            const btn2f = document.getElementById('btn-sec-2f');
            if (btn2f) btn2f.classList.add('active');
        } else if (Math.abs(h - 3.0) < 0.05) {
            const btn1f = document.getElementById('btn-sec-1f');
            if (btn1f) btn1f.classList.add('active');
        }
    }
}

function onSectionSlider(val) {
    setSectionCut(val);
}

// 4-1. GLTF / GLB Loader Logic
const gltfLoader = new THREE.GLTFLoader();
const dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath('models/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

function loadStaticGltfIfExists(modelUrl) {
    gltfLoader.load(
        modelUrl,
        function (gltf) {
            console.log('Custom GLTF model loaded successfully:', modelUrl);
            applyLoadedModel(gltf.scene, '사용자 로컬 3D 모델 (building.glb)');
        },
        undefined,
        function (error) {
            console.log('No local models/building.glb found. Using procedural mass.');
        }
    );
}

function handleModelUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    gltfLoader.load(
        fileUrl,
        function (gltf) {
            applyLoadedModel(gltf.scene, file.name);
            URL.revokeObjectURL(fileUrl);
        },
        function (xhr) {
            document.getElementById('anno-title').innerText = `3D 모델 로딩 중... (${Math.round((xhr.loaded / xhr.total) * 100)}%)`;
        },
        function (err) {
            console.error('GLTF Load Error:', err);
            alert('.glb 또는 .gltf 모델을 파싱하는 중 오류가 발생했습니다. 올바른 3D 파일인지 확인해주세요.');
        }
    );
}

function applyLoadedModel(modelScene, modelName) {
    if (massGroup) {
        scene.remove(massGroup);
    }

    isCustomModelLoaded = true;

    const box = new THREE.Box3().setFromObject(modelScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? (20 / maxDim) : 1;
    modelScene.scale.set(scale, scale, scale);

    modelScene.position.x = -center.x * scale;
    modelScene.position.y = -box.min.y * scale;
    modelScene.position.z = -center.z * scale;

    modelScale = scale;
    modelBaseY = modelScene.position.y;

    modelScene.traverse(node => {
        if (node.isMesh && node.material) {
            if (Array.isArray(node.material)) {
                node.material.forEach(m => {
                    m.clippingPlanes = [sectionPlane];
                });
            } else {
                node.material.clippingPlanes = [sectionPlane];
            }
        }
    });

    enableSectionControls(true);
    setSectionCut('all');

    massGroup = new THREE.Group();
    massGroup.add(modelScene);
    scene.add(massGroup);

    const centerY = (size.y * scale) / 2;
    controls.target.set(0, centerY, 0);
    camera.position.set(20, centerY + 10, 22);
    camera.lookAt(0, centerY, 0);
    controls.update();

    document.getElementById('anno-title').innerText = "전체 매스 (Overall Massing)";
    document.getElementById('anno-desc').innerText = "[CORE]로 모으고, [LOOP]로 순환하며, [NEXUS]로 연결한다. 서로 다른 속도의 삶이 부딪히지 않고 공존하는 우주적 질서를 통해, 타인은 비로소 가족이 된다.";
}

// 3D Mass Highlight & Spatial Description
const partAnnotations = {
    core: {
        title: "CORE (Sunken Living)",
        desc: "대지 중앙에 30cm 낮춘 원형 선큰 거실을 배치하여, 흩어진 개인들을 안쪽으로 끌어당기는 강력한 심리적 구심점을 형성한다."
    },
    loop: {
        title: "LOOP (1.4m Circulation Loop)",
        desc: "직각의 개인방 사이를 연결하는 곡선형 순환 복도는, 서로 다른 시간대를 사는 거주자들이 좁은 복도에서 충돌 없이 유연하게 교차하는 조율 장치이다."
    },
    nexus: {
        title: "NEXUS (Void & Atrium)",
        desc: "1층과 2층을 수직으로 관통하는 아트리움(Void)을 통해 시선이 끊임없이 교차하며, 물리적 거리는 두되 심리적 유대는 유지하는 느슨한 연대를 구축한다."
    },
    screen: {
        title: "Brick Screen (영롱쌓기)",
        desc: "외부 시선은 벽돌 스크린에 막혀 프라이버시를 완벽하게 보호함. 내부에서는 벽돌 틈 사이로 답답함 없이 외부 풍경을 조망함."
    }
};

function highlightPart(partName) {
    if (!massGroup) return;

    document.querySelectorAll('.part-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = (typeof event !== 'undefined' && event && event.currentTarget) ?
        event.currentTarget :
        document.querySelector(`.part-btn[onclick*="${partName}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    if (!isCustomModelLoaded) {
        massGroup.children.forEach(mesh => {
            if (mesh.name === partName) {
                mesh.material = new THREE.MeshStandardMaterial({
                    color: 0x5eead4,
                    roughness: 0.2,
                    metalness: 0.3,
                    emissive: 0x134e4a,
                    wireframe: isWireframe
                });
            } else {
                mesh.material = new THREE.MeshStandardMaterial({
                    color: 0x475569,
                    roughness: 0.6,
                    transparent: true,
                    opacity: 0.35,
                    wireframe: isWireframe
                });
            }
        });
    }

    const info = partAnnotations[partName];
    if (info) {
        document.getElementById('anno-title').innerText = info.title;
        document.getElementById('anno-desc').innerText = info.desc;
    }
}

function resetMassHighlight() {
    if (!massGroup) return;
    document.querySelectorAll('.part-btn').forEach(btn => btn.classList.remove('active'));

    if (!isCustomModelLoaded) {
        const clayMaterial = new THREE.MeshStandardMaterial({
            color: 0xe2e8f0,
            roughness: 0.35,
            metalness: 0.1,
            wireframe: isWireframe
        });

        const brickMaterial = new THREE.MeshStandardMaterial({
            color: 0xb45309,
            roughness: 0.7,
            metalness: 0.05,
            wireframe: isWireframe
        });

        const loopMaterial = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            roughness: 0.4,
            metalness: 0.1,
            wireframe: isWireframe
        });

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x5eead4,
            transparent: true,
            opacity: 0.45,
            roughness: 0.1,
            transmission: 0.6,
            wireframe: isWireframe
        });

        massGroup.children.forEach(mesh => {
            if (mesh.name === 'nexus') {
                mesh.material = glassMaterial;
            } else if (mesh.name === 'screen') {
                mesh.material = brickMaterial;
            } else if (mesh.name === 'loop') {
                mesh.material = loopMaterial;
            } else {
                mesh.material = clayMaterial;
            }
        });
    }

    document.getElementById('anno-title').innerText = "전체 매스 (Overall Massing)";
    document.getElementById('anno-desc').innerText = "[CORE]로 모으고, [LOOP]로 순환하며, [NEXUS]로 연결한다. 서로 다른 속도의 삶이 부딪히지 않고 공존하는 우주적 질서를 통해, 타인은 비로소 가족이 된다.";
}

// --- 4. Audience-Tailored 30-Sec Briefing Logic ---
const briefingData = {
    concept: {
        tag: "FORM & SPATIAL CONCEPT",
        title: "건축적 중력 : 타인을 묶는 보이지 않는 힘",
        bullets: [
            "The Definition — 오늘날의 가족은 혈연을 넘어 '관계의 지속성'으로 확장되고 있다. 본 프로젝트는 서로 다른 궤적을 그려온 30대 4인이 타인에서 우리가 되어가는 과정을 담는 건축적 그릇이다.",
            "The Solution — 우리는 이들이 지속 가능한 유대를 맺기 위해 필요한 것은 억지스러운 통합이 아니라, 서로를 강력하게 끌어당기는 구심점(Core)이라고 정의했다. 이 집은 단순한 거주 공간을 넘어, 흩어지려는 개인들을 안으로 당기는 건축적 중력 장치이다.",
            "The Strategy — [CORE]로 모으고, [LOOP]로 순환하며, [NEXUS]로 연결한다. 서로 다른 속도의 삶이 부딪히지 않고 공존하는 우주적 질서를 통해, 타인은 비로소 가족이 된다."
        ]
    },
    site: {
        tag: "SITE & USER CONTEXT",
        title: "대지와 사용자",
        bullets: [
            "The Urban Link (도시적 연결): 북측의 공원과 남서측의 상업지구 사이에 위치하여, 주거의 쾌적함과 도시의 활력을 잇는 가교 역할.",
            "Infrastructure (인프라): 단지 내 보행로는 공원 산책로와 연결되며, 인접한 남위례역을 통해 도심 접근성이 우수한 교통의 교차점.",
            "Balance (균형): 자연의 여유와 도시의 편의가 공존하는 입지적 특성을 반영하여, 외부와 소통 가능한 주거 환경을 제안함.",
            "The Conflict (12시간의 마찰): 새벽 4시에 자는 사람과 4시 반에 일어나는 사람. 하루 중 12시간 이상 활동과 수면이 겹쳐 소음 및 동선 간섭이 발생함.",
            "Orbit Circulation (순환 궤도): 물리적 거리를 확보하되 순환형 복도로 연결하여, 서로 다른 시간대를 사는 이들이 충돌 없이 공존하는 건축적 장치."
        ]
    },
    material: {
        tag: "MATERIAL & DETAIL",
        title: "IDENTITY : Red Brick",
        bullets: [
            "IDENTITY : Red Brick — 시간이 흐를수록 고풍스러운 깊이를 더하는 붉은 벽돌은, 비혈연 공동체의 관계가 층층이 쌓여가는 시간의 적층과 따뜻한 궤도의 정체성을 상징한다.",
            "Block In (차단): 외부 시선은 벽돌 스크린에 막혀 프라이버시를 완벽하게 보호함.",
            "View Out (조망): 내부에서는 벽돌 틈 사이로 답답함 없이 외부 풍경을 조망함."
        ]
    },
    process: {
        tag: "MASS PROCESS",
        title: "05. Mass Process",
        bullets: [
            "1. Core Generation",
            "2. Function Attachment",
            "3. Orbit Connection",
            "4. Mass Unification",
            "5. Visual Filtering"
        ]
    }
};

function switchBriefing(type) {
    document.querySelectorAll('.r-tab').forEach(btn => btn.classList.remove('active'));
    const targetBtn = (typeof event !== 'undefined' && event && event.currentTarget) ?
        event.currentTarget :
        document.querySelector(`.r-tab[onclick*="${type}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    const data = briefingData[type];
    if (!data) return;

    const display = document.getElementById('briefing-display');
    if (display) {
        display.innerHTML = `
            <div class="briefing-box">
                <span class="briefing-tag">${data.tag}</span>
                <h4 class="briefing-heading">${data.title}</h4>
                <ul class="briefing-list">
                    ${data.bullets.map(b => `<li><span class="bullet-dot">▸</span> <span>${b}</span></li>`).join('')}
                </ul>
            </div>
        `;
    }
}

// 5. 시나리오 룰베이스 답변 데이터베이스 (ORBIT 프로젝트 내용)
const scenarioResponses = [
    {
        keywords: ["orbit", "오르빗", "개념", "concept", "의도", "중력"],
        answer: "ORBIT은 '건축적 중력 : 타인을 묶는 보이지 않는 힘'을 주제로, 서로 다른 궤적을 그려온 30대 4인이 타인에서 우리가 되어가는 과정을 담는 건축적 그릇입니다. [CORE]로 모으고, [LOOP]로 순환하며, [NEXUS]로 연결합니다."
    },
    {
        keywords: ["core", "코어", "거실", "선큰", "sunken"],
        answer: "대지 중앙에 30cm 낮춘 원형 선큰 거실(CORE)을 배치하여, 흩어진 개인들을 안쪽으로 끌어당기는 강력한 심리적 구심점을 형성합니다."
    },
    {
        keywords: ["loop", "루프", "복도", "동선", "순환"],
        answer: "직각의 개인방 사이를 연결하는 1.4m 곡선형 순환 복도(LOOP)는, 서로 다른 시간대를 사는 거주자들이 좁은 복도에서 충돌 없이 유연하게 교차하는 조율 장치입니다."
    },
    {
        keywords: ["nexus", "넥서스", "보이드", "아트리움", "void", "atrium"],
        answer: "1층과 2층을 수직으로 관통하는 아트리움(Void/NEXUS)을 통해 시선이 끊임없이 교차하며, 물리적 거리는 두되 심리적 유대는 유지하는 느슨한 연대를 구축합니다."
    },
    {
        keywords: ["벽돌", "brick", "재료", "영롱쌓기", "외벽", "screen"],
        answer: "시간이 흐를수록 고풍스러운 깊이를 더하는 붉은 벽돌(Red Brick)과 도로변 이중 외피 영롱쌓기(Honeycomb Screen)를 적용했습니다. 외부 시선은 차단(Block In)하여 프라이버시를 보호하고 내부에서는 외부 풍경을 조망(View Out)할 수 있습니다."
    }
];

// Init everything once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    initThreeViewer();
    switchBriefing('concept');
});
