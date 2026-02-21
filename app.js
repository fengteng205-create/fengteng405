(function() {
    'use strict';

    const state = {
        currentTab: 'copywriting',
        selectedTemplate: 1,
        selectedIntro: 1,
        mediaType: 'video',
        videoFile: null,
        imageFiles: [],
        customTemplate: null,
        generatedCopywriting: null,
        posterData: null,
        videoData: null
    };

    const templates = [
        { name: '简约紫韵', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { name: '活力粉橙', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { name: '清新蓝调', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { name: '生机绿意', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { name: '暖阳夕照', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { name: '柔粉渐变', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
        { name: '樱花粉嫩', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
        { name: '奶油杏色', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
        { name: '赛博霓虹', gradient: 'linear-gradient(135deg, #ff3cac 0%, #784ba0 50%, #2b86c5 100%)' },
        { name: '科技蓝', gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)' }
    ];

    const titleTemplates = {
        '招生引流': [
            '震惊！{school}家长都在疯传的秘密竟然是...',
            '99%的家长都不知道，{school}竟然...',
            '@所有家长，{school}春季招生火热进行中！',
            '为什么越来越多的家长选择{school}？答案在这里',
            '限时优惠！{school}2024年招生正式启动'
        ],
        '家长必看': [
            '家长必看！{school}老师透漏的提分秘诀',
            '紧急通知：{school}家长必看的三大误区',
            '90%的家长都错了，{school}告诉你正确答案',
            '家长必收藏！{school}学习规划指南',
            '关乎孩子未来，{school}家长必须知道的事'
        ],
        '干货分享': [
            '{school}内部资料流出！速收藏',
            '{school}老师分享：提高成绩的黄金法则',
            '干货预警！{school}学霸养成计划',
            '{school}独家秘笈，看完受益终身',
            '建议收藏！{school}学习技巧大全'
        ],
        '学员案例': [
            '从不及格到满分，{school}学员亲身讲述',
            '逆袭案例！{school}学生如何做到',
            '见证奇迹！{school}学员成长记录',
            '{school}优秀学员案例分享',
            '点赞！{school}学员的华丽蜕变'
        ],
        '热点结合': [
            '2024教育新趋势，{school}引领未来',
            '教育改革背景下，{school}这样做',
            '双减政策下，{school}如何帮助孩子',
            '新学期新选择，{school}给你答案',
            '教育圈炸锅了，{school}出大招'
        ]
    };

    const openingHooks = {
        '招生引流': [
            '家长们，集合了！今天我要跟你们聊一个你们特别关心的话题——怎么让孩子学习更高效，成绩提升更快！',
            '别划走！今天这条视频关系到你家孩子的未来，错过损失一个亿！',
            '各位家长朋友们，你们有没有发现，孩子成绩总是提不上去？其实是方法没用对！'
        ],
        '家长必看': [
            '各位家长，请先暂停手中的事情，这条视频可能会改变你对孩子教育的认知！',
            '家长必看！90%的家长都在犯这几个错误，{school}老师今天一次性告诉你！',
            '紧急通知！这几个教育误区正在毁掉你的孩子，{school}建议家长立即观看！'
        ],
        '干货分享': [
            '准备好了吗？今天{school}要分享一些压箱底的干货，建议先收藏再观看！',
            '这条视频我准备了很久，{school}团队呕心沥血整理的学习方法，建议打印出来！',
            '干货时间到！{school}今天要把所有技巧都教给你，记得做好笔记！'
        ],
        '学员案例': [
            '你们一直催的学员案例来了！今天{school}真实案例分享，建议收藏！',
            '你们见过从不及格到满分的孩子吗？{school}今天就让你开开眼！',
            '太激动了！{school}学员的真实成长经历，看完你也会被震撼到！'
        ],
        '热点结合': [
            '最近教育圈发生了大事！{school}老师第一时间来给你们解读！',
            '2024年教育圈新动态，{school}带你第一时间了解！',
            '家长们注意了！最新教育政策解读，{school}帮你划重点！'
        ]
    };

    const scriptTemplates = {
        '招生引流': [
            '哈喽，家长们好！我是{school}的老师。\n\n今天不聊别的，就想跟你们说说，为什么越来越多的家长都把孩子送到{school}。\n\n首先啊，咱们{school}最大的特点就是{advantage}。不像那些大班教学，一个班五六十人，老师根本顾不过来。在{school}，我们坚持小班授课，每个孩子都能得到充分的关注。\n\n其次，咱们师资力量那真是没话说。都是经过层层筛选，有多年教学经验的名师。不仅课教得好，更懂得怎么跟孩子沟通，怎么激发孩子的学习兴趣。\n\n还有啊，咱们一直秉承{advantage}的理念。让孩子不仅能考出好成绩，更能养成良好的学习习惯，受益终身。\n\n所以啊，如果你们正在为孩子选择培训机构，真心推荐来{school}看看。名额有限，感兴趣的家长赶紧私信我，或者直接来校区咨询吧！'
        ],
        '家长必看': [
            '各位家长好，我是{school}的张老师。\n\n今天我想跟你们聊一个特别重要的话题——很多家长一直在犯的教育错误，看看有没有你。\n\n第一个误区：只关注成绩，不关注过程。很多家长看到孩子考差了就着急骂人，但有没有想过，孩子为什么考不好？是基础不牢？还是方法不对？\n\n第二个误区：给孩子报太多班。孩子周一到周日都在上课，一点休息时间都没有。这样孩子只会越来越厌学，成绩反而越来越差。\n\n第三个误区：不尊重孩子的兴趣。逼着孩子学不喜欢的的东西，结果花了钱，孩子还抵触。\n\n在{school}，我们一直强调{advantage}。只有让孩子爱上学习，才能真正提高成绩。\n\n如果你也有这些困惑，欢迎来{school}，我们一起探讨更好的教育方法！'
        ],
        '干货分享': [
            '哈喽，大家好！{school}干货时间到！\n\n今天要分享的是——如何让孩子主动学习，这是我从事教育这么多年总结出来的经验，建议收藏！\n\n第一招：制造学习仪式感。给孩子准备一个专门的学习角，每天固定时间学习，让大脑形成习惯。\n\n第二招：设置阶梯目标。不要一上来就让孩子考100分，先定一个小目标，比如下次考试进步5分。完成了再设置更高的目标。\n\n第三招：及时正向反馈。孩子做对了要马上表扬，不要等到下次考试才认可。\n\n第四招：创造竞争氛围。可以让孩子跟同学比，跟班级比，适度的竞争能激发动力。\n\n当然，这些方法说起来容易做起来难。如果你们需要更专业的指导，欢迎来{school}，我们有专业的老师一对一帮你规划！'
        ],
        '学员案例': [
            '家长们好！今天要给你们分享一个{school}学员的真实案例，看完你绝对会震撼！\n\n这个孩子叫小明，来{school}之前啊、数学成绩一直不及格，家长急得不行。试了很多方法，请家教、报班课，钱花了不少，效果却不好。\n\n后来经朋友介绍来到{school}，我们的老师给他做了全面测评，发现问题出在学习方法上。这孩子其实很聪明，就是方法不对。\n\n针对他的情况，我们制定了专属的学习方案。坚持了三个月，你们猜怎么着？数学从不及格考到了92分！\n\n后来他爸妈激动得给我们送来了锦旗。其实在{school}，这样的案例还有很多。每个孩子都有潜力，关键是要用对方法。\n\n如果你家孩子也有类似问题，欢迎来{school}，让我们帮你家孩子也实现逆袭！'
        ],
        '热点结合': [
            '家长们好！我是{school}的王老师。\n\n最近教育圈发生了一件大事——双减政策落地，很多家长都慌了，不知道该怎么鸡娃了。\n\n今天我来给你们解读一下，顺便说说{school}是怎么应对的。\n\n其实啊，双减政策的核心是：减轻义务教育阶段学生作业负担和校外培训负担。这对我们{school}来说，是挑战也是机遇。\n\n为什么这么说？因为{school}一直坚持{advantage}的理念。我们不提倡题海战术，不提倡超前学习，我们更注重培养孩子的学习能力和思维方法。\n\n所以啊，政策变了，家长的观念也要变。与其疯狂鸡娃，不如找对方法。\n\n如果你们想了解更多关于如何应对新政策，如何让孩子在改革中脱颖而出，欢迎来{school}咨询！'
        ]
    };

    const endingHooks = [
        '好了，今天的分享就到这里。如果对你有帮助，记得点赞收藏，关注我不迷路！有任何问题评论区见，或者直接私信我！',
        '觉得有用的家长，点个赞再走呗！关注我，下期更精彩！还有问题的话，评论区留言，我来帮你解答！',
        '这条视频信息量有点大，建议多看几遍消化一下。喜欢的话点个赞，关注{school}，我们下期再见！',
        '感谢各位家长的观看！如果你们想了解更多关于{school}的课程信息，抓紧时间私信我，名额有限，先到先得！',
        '好了，今天就到这里。如果觉得有帮助，点个关注不迷路！有问题随时找我，{school}随时为你们服务！'
    ];

    const tagOptions = [
        '#教育培训 #学习技巧 #提分秘诀 #家长必看 #教育干货',
        '#升学规划 #学习方法 #成绩提升 #教育分享 #校园生活',
        '#招生季 #教育培训 #学校推荐 #学习日常 #教育热点',
        '#学霸养成 #考试技巧 #教育经验 #学习方法 #成长记录',
        '#孩子教育 #家长必收藏 #学习规划 #教育心得 #干货分享'
    ];

    function init() {
        bindEvents();
        updateTabIndicator();
    }

    function bindEvents() {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', handleTabSwitch);
        });

        document.querySelectorAll('.result-tab').forEach(tab => {
            tab.addEventListener('click', handleResultTabSwitch);
        });

        document.getElementById('generateCopywriting').addEventListener('click', generateCopywriting);
        document.getElementById('applyToPoster').addEventListener('click', applyToPoster);
        document.getElementById('applyToVideo').addEventListener('click', applyToVideo);

        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', handleTemplateSelect);
        });

        document.getElementById('randomTemplate').addEventListener('click', handleRandomTemplate);
        document.getElementById('customTemplateInput').addEventListener('change', handleCustomTemplate);
        document.getElementById('generatePoster').addEventListener('click', generatePoster);
        document.getElementById('downloadPoster').addEventListener('click', downloadPoster);
        document.getElementById('copyPoster').addEventListener('click', copyPoster);

        document.querySelectorAll('.media-type-btn').forEach(btn => {
            btn.addEventListener('click', handleMediaTypeSwitch);
        });

        document.getElementById('videoInput').addEventListener('change', handleVideoUpload);
        document.getElementById('removeVideo').addEventListener('click', removeVideo);
        document.getElementById('imageInput').addEventListener('change', handleImageUpload);

        document.querySelectorAll('.intro-template-item').forEach(item => {
            item.addEventListener('click', handleIntroSelect);
        });

        document.getElementById('generateVideo').addEventListener('click', generateVideo);

        document.querySelectorAll('.btn-copy').forEach(btn => {
            btn.addEventListener('click', handleCopyContent);
        });
    }

    function handleTabSwitch(e) {
        const tab = e.currentTarget.dataset.tab;
        state.currentTab = tab;

        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');

        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(`${tab}-panel`).classList.add('active');

        updateTabIndicator();
    }

    function updateTabIndicator() {
        const activeTab = document.querySelector('.nav-tab.active');
        if (activeTab) {
            const indicator = document.querySelector('.tab-indicator');
            indicator.style.left = activeTab.offsetLeft + 'px';
            indicator.style.width = activeTab.offsetWidth + 'px';
        }
    }

    function handleResultTabSwitch(e) {
        const tab = e.currentTarget.dataset.resultTab;

        document.querySelectorAll('.result-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');

        document.querySelectorAll('.result-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(`result-${tab}`).classList.add('active');
    }

    function showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    }

    function hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function generateCopywriting() {
        const schoolName = document.getElementById('schoolName').value.trim();
        const topicType = document.getElementById('topicType').value;
        const schoolAdvantage = document.getElementById('schoolAdvantage').value.trim();

        if (!schoolName) {
            showToast('请输入学校名称');
            return;
        }
        if (!topicType) {
            showToast('请选择选题类型');
            return;
        }
        if (!schoolAdvantage) {
            showToast('请输入学校优势');
            return;
        }

        showLoading();
        console.log('开始调用智谱AI生成文案...');

        fetch('https://fengteng405.vercel.app/api/copywriting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                schoolName: schoolName,
                topicType: topicType,
                schoolAdvantage: schoolAdvantage
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            console.log('AI返回数据:', data);
            
            const result = {
                titles: data.titles || [],
                openingHook: data.openingHook || '',
                scriptContent: data.scriptContent || '',
                endingHook: data.endingHook || '',
                tags: data.tags || []
            };

            state.generatedCopywriting = result;
            displayCopywritingResult(result);
            hideLoading();
            showToast('文案生成成功！');
        })
        .catch(error => {
            console.error('生成文案时出错:', error);
            console.error('错误详情:', error.response?.data);
            hideLoading();
            let errorMsg = 'AI生成失败，请重试';
            if (error.response?.data?.error) {
                errorMsg = error.response.data.error;
            } else if (error.message) {
                errorMsg = error.message;
            }
            showToast(errorMsg);
        });
    }

    function displayCopywritingResult(result) {
        const titleList = document.getElementById('titleList');
        titleList.innerHTML = result.titles.map((title, index) => `
            <div class="title-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <span class="title-item-number">${index + 1}</span>
                <span class="title-item-text">${title}</span>
            </div>
        `).join('');

        document.getElementById('openingHook').textContent = result.openingHook;
        document.getElementById('scriptContent').textContent = result.scriptContent;
        document.getElementById('endingHook').textContent = result.endingHook;

        const tagsContainer = document.getElementById('tagsContainer');
        tagsContainer.innerHTML = result.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        document.getElementById('copywritingResult').style.display = 'block';
    }

    function applyToPoster() {
        if (!state.generatedCopywriting) {
            showToast('请先生成引流文案');
            return;
        }

        document.querySelectorAll('.nav-tab')[1].click();
        document.getElementById('posterSchoolName').value = document.getElementById('schoolName').value;
        document.getElementById('painPoint').value = state.generatedCopywriting.tags[0].replace(/#/g, '').replace(/ /g, ', ');
    }

    function applyToVideo() {
        if (!state.generatedCopywriting) {
            showToast('请先生成引流文案');
            return;
        }

        document.querySelectorAll('.nav-tab')[2].click();
    }

    function handleTemplateSelect(e) {
        const item = e.currentTarget.closest('.template-item');
        document.querySelectorAll('.template-item').forEach(t => t.classList.remove('active'));
        item.classList.add('active');
        state.selectedTemplate = parseInt(item.dataset.template);
    }

    function handleRandomTemplate() {
        const randomIndex = Math.floor(Math.random() * templates.length) + 1;
        state.selectedTemplate = randomIndex;
        document.querySelectorAll('.template-item').forEach(t => {
            t.classList.toggle('active', parseInt(t.dataset.template) === randomIndex);
        });
    }

    function handleCustomTemplate(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                state.customTemplate = event.target.result;
                showToast('自定义模板上传成功');
            };
            reader.readAsDataURL(file);
        }
    }

    function generatePoster() {
        const schoolName = document.getElementById('posterSchoolName').value.trim();
        const painPoint = document.getElementById('painPoint').value.trim();

        if (!schoolName) {
            showToast('请输入学校名称');
            return;
        }
        if (!painPoint) {
            showToast('请输入痛点关键词');
            return;
        }

        showLoading();

        fetch('https://fengteng405.vercel.app/api/poster', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                schoolName: schoolName,
                painPoint: painPoint,
                template: state.selectedTemplate
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            
            const template = templates[state.selectedTemplate - 1];
            const posterPreview = document.getElementById('posterPreview');

            posterPreview.style.background = template.gradient;
            document.getElementById('posterTopText').textContent = data.topText || painPoint;
            document.getElementById('posterSchoolDisplay').textContent = data.bottomText || schoolName;

            state.posterData = {
                schoolName: schoolName,
                painPoint: painPoint,
                template: template,
                aiText: data
            };

            document.getElementById('posterResult').style.display = 'block';
            hideLoading();
            showToast('海报生成成功！');
        })
        .catch(error => {
            console.error('生成海报时出错:', error);
            hideLoading();
            showToast('海报生成失败: ' + error.message);
        });
    }

    function downloadPoster() {
        showToast('海报下载功能需要后端支持');
    }

    function copyPoster() {
        showToast('海报复制功能需要后端支持');
    }

    function handleMediaTypeSwitch(e) {
        const type = e.currentTarget.dataset.media;
        state.mediaType = type;

        document.querySelectorAll('.media-type-btn').forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        document.getElementById('videoUploadSection').style.display = type === 'video' ? 'block' : 'none';
        document.getElementById('imageUploadSection').style.display = type === 'image' ? 'block' : 'none';

        updateGenerateButton();
    }

    function handleVideoUpload(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 100 * 1024 * 1024) {
                showToast('视频文件不能超过100MB');
                return;
            }
            state.videoFile = file;
            document.getElementById('videoFileName').textContent = file.name;
            document.getElementById('videoFileInfo').style.display = 'flex';
            document.getElementById('videoUploadArea').style.display = 'none';
            updateGenerateButton();
        }
    }

    function removeVideo() {
        state.videoFile = null;
        document.getElementById('videoInput').value = '';
        document.getElementById('videoFileInfo').style.display = 'none';
        document.getElementById('videoUploadArea').style.display = 'flex';
        updateGenerateButton();
    }

    function handleImageUpload(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            state.imageFiles = files;
            const previewGrid = document.getElementById('imagePreviewGrid');
            previewGrid.innerHTML = files.map((file, index) => `
                <div class="image-preview-item" data-index="${index}">
                    <img src="${URL.createObjectURL(file)}" alt="Preview">
                    <button class="image-preview-remove" data-index="${index}">×</button>
                </div>
            `).join('');

            previewGrid.style.display = 'grid';
            document.getElementById('imageUploadArea').style.display = 'none';

            previewGrid.querySelectorAll('.image-preview-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    state.imageFiles.splice(index, 1);
                    handleImageUpload({ target: { files: state.imageFiles } });
                });
            });

            updateGenerateButton();
        }
    }

    function handleIntroSelect(e) {
        const item = e.currentTarget.closest('.intro-template-item');
        document.querySelectorAll('.intro-template-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        state.selectedIntro = parseInt(item.dataset.intro);
    }

    function updateGenerateButton() {
        const btn = document.getElementById('generateVideo');
        const hasMedia = state.mediaType === 'video' ? !!state.videoFile : state.imageFiles.length > 0;
        btn.disabled = !hasMedia;
    }

    function generateVideo() {
        showLoading();

        setTimeout(() => {
            state.videoData = {
                mediaType: state.mediaType,
                intro: state.selectedIntro,
                bgMusic: document.getElementById('bgMusic').value,
                subtitle: document.getElementById('subtitleStyle').value
            };

            document.getElementById('videoResult').style.display = 'block';
            hideLoading();
            showToast('视频生成成功！');
        }, 2000);
    }

    function handleCopyContent(e) {
        const type = e.target.dataset.copy;
        const content = document.getElementById(type).textContent;

        navigator.clipboard.writeText(content).then(() => {
            showToast('复制成功！');
        }).catch(() => {
            showToast('复制失败，请手动复制');
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
