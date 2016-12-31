document.addEventListener('DOMContentLoaded',function() {
	const player = document.querySelector('.player');
	const video = player.querySelector('.viewer');
	const progress = player.querySelector('.progress');
	const progressBar = player.querySelector('.progress__filled');
	const toggle = player.querySelector('.toggle');
	const skipButtons = player.querySelectorAll('[data-skip]');
	const ranges = player.querySelectorAll('.player__slider');

	function toggleVideo() {
		const method = video.paused ? 'play' : 'pause';
		video[method]();
	}

	function toggleButton() {
		toggle.textContent = this.paused ? '►' : '❚ ❚';
	}

	function skip() {
		video.currentTime += parseFloat(this.dataset.skip);
	}

	function handleRangeUpdate() {
		video[this.name] = this.value;
	}

	function handleProgress() {
		progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
	}

	function scrub(e) {
		video.currentTime = ( e.offsetX / progress.offsetWidth ) * video.duration;
	}

	video.addEventListener('click', toggleVideo);
	video.addEventListener('play', toggleButton);
	video.addEventListener('pause', toggleButton);
	video.addEventListener('timeupdate', handleProgress);

	toggle.addEventListener('click', toggleVideo);

	skipButtons.forEach(button => button.addEventListener('click', skip));
	ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));
	ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

	let mousedown = false;
	progress.addEventListener('click', scrub);
	progress.addEventListener('mousemove', (e) => mousedown && scrub);
	progress.addEventListener('mousedown', () => mousedown = true);
	progress.addEventListener('mouseup', () => mousedown = false);
});
