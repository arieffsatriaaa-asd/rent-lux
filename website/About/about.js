        // Visi / Misi / Our Value tabs
        const vmTabs = document.querySelectorAll('.vm-tab');
        const vmPanels = document.querySelectorAll('.vm-panel');
        const vmPanelsWrap = document.querySelector('.vm-panels');

        // Measure the tallest panel (Our Value has the most content) and lock
        // the container to that height so the background photo stays a fixed
        // size no matter which tab is active.
        function syncVmPanelsHeight() {
            if (!vmPanelsWrap) return;
            let maxHeight = 0;

            vmPanels.forEach(panel => {
                panel.style.position = 'static';
                panel.style.display = 'grid';
                maxHeight = Math.max(maxHeight, panel.offsetHeight);
            });

            vmPanels.forEach(panel => {
                panel.style.position = '';
                panel.style.display = '';
            });

            vmPanelsWrap.style.height = maxHeight + 'px';
        }

        vmTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                vmTabs.forEach(t => {
                    t.classList.toggle('active', t === tab);
                    t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
                });

                vmPanels.forEach(panel => {
                    panel.classList.toggle('active', panel.dataset.panel === target);
                });
            });
        });

        syncVmPanelsHeight();
        window.addEventListener('load', syncVmPanelsHeight);

        let vmResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(vmResizeTimer);
            vmResizeTimer = setTimeout(syncVmPanelsHeight, 150);
        });