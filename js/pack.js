// js/pack.js
// The 3D booster pack: press and drag to shake it, drag across it to tear it open, drag up or down to move it.

let pk = null;

function unmountPack() {
    pk?.dispose();
    pk = null;
}

async function mountPack(host, { canOpen, onRip, onOpen }) {
    unmountPack();
    host.textContent = 'Loading the pack...';
    let THREE, GLTFLoader, gltf;
    try {
        THREE = await import('three');
        ({ GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js'));
        gltf = await new GLTFLoader().loadAsync('source/basic.glb');
    }
    catch {
        if (host.isConnected)
            host.textContent = 'The pack could not load right now.';
        return;
    }
    if (!host.isConnected)
        return;
    host.textContent = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
    camera.position.z = 9;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    host.append(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(2, 4, 6);
    scene.add(sun);

    const model = gltf.scene, root = new THREE.Group();
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
    const k = 3.4 / Math.max(size.x, size.y);
    model.scale.setScalar(k);
    model.position.copy(center).multiplyScalar(-k);
    root.add(model);
    scene.add(root);

    const mixer = new THREE.AnimationMixer(model);
    const clip = name => THREE.AnimationClip.findByName(gltf.animations, name);
    const shake = mixer.clipAction(clip('shake')), open = mixer.clipAction(clip('Open'));
    shake.setLoop(THREE.LoopOnce, 1);
    open.setLoop(THREE.LoopOnce, 1);
    open.clampWhenFinished = true;

    let state = 'closed';
    mixer.addEventListener('finished', e => {
        if (e.action === open) {
            state = 'open';
            onOpen();
        }
    });

    const rip = () => {
        if (state !== 'closed' || !canOpen())
            return false;
        state = 'opening';
        open.reset().play();
        onRip();
        return true;
    };
    const reset = () => {
        open.stop();
        state = 'closed';
    };

    const aim = { x: 0, y: 0 }, rot = { x: 0, y: 0 }, move = { y: 0 };
    let drag = null;
    const hover = e => {
        const r = host.getBoundingClientRect();
        aim.y = ((e.clientX - r.left) / r.width - .5) * .6;
        aim.x = ((e.clientY - r.top) / r.height - .5) * .4;
    };
    host.addEventListener('pointerdown', e => {
        drag = { x: e.clientX, y: e.clientY, across: 0 };
        host.setPointerCapture(e.pointerId);
        if (state === 'closed')
            shake.reset().play();
    });
    host.addEventListener('pointermove', e => {
        if (!drag)
            return hover(e);
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        drag.x = e.clientX;
        drag.y = e.clientY;
        drag.across += Math.abs(dx);
        aim.y += dx * .004;
        move.y = Math.max(-1, Math.min(1, move.y - dy * .01));
        if (drag.across > host.clientWidth * .6)
            rip();
    });
    const release = () => {
        drag = null;
    };
    host.addEventListener('pointerup', release);
    host.addEventListener('pointercancel', release);
    host.addEventListener('pointerleave', () => {
        if (!drag)
            aim.x = aim.y = 0;
    });

    const clock = new THREE.Clock();
    let raf = 0;
    const frame = () => {
        if (!host.isConnected)
            return dispose();
        mixer.update(clock.getDelta());
        rot.x += (aim.x - rot.x) * .08;
        rot.y += (aim.y - rot.y) * .08;
        root.rotation.set(rot.x, rot.y, 0);
        root.position.y = move.y * 1.2 + Math.sin(clock.elapsedTime * 1.5) * .05;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
        const w = host.clientWidth, h = host.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
    ro.observe(host);

    function dispose() {
        cancelAnimationFrame(raf);
        ro.disconnect();
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
        if (pk?.dispose === dispose)
            pk = null;
    }

    pk = { rip, reset, dispose };
    frame();
}
