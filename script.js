// DOM Elements
const albumArt = document.getElementById('album-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const progressBar = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const prevButton = document.getElementById('prev-button');
const playPauseButton = document.getElementById('play-pause-button');
const nextButton = document.getElementById('next-button');
const volumeSlider = document.getElementById('volume-slider');
const playlist = document.getElementById('playlist');
const themeToggle = document.getElementById('theme-toggle');

// Audio element
const audio = new Audio();

// Playlist
const tracks = [
  {
    title: 'Unforgettable',
    artist: 'French Montana',
    file: './songs/French Montana - Unforgettable.mp3',
    albumArt:
      'https://i.ibb.co/CBLnsRZ/Unforgettable-feat-Swae-Lee-French-Montana-Song-Lyrics-Music-Videos-Concerts.jpg',
  },
  {
    title: 'SUMMER HIGH',
    artist: 'AP DHILLON',
    file: './songs/AP.mp3',
    albumArt: 'https://i.ibb.co/4KwzTd7/Summer-High.jpg',
  },
  {
    title: 'Attention',
    artist: 'Charlie Puth',
    file: './songs/charlie puth - attention.mp3',
    albumArt: 'https://i.ibb.co/hFDT3WL/Charlie-Puth.jpg',
  },
  {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    file: './songs/Ed Sheeran - Shape.mp3',
    albumArt:
      'https://i.ibb.co/Vq2GNJT/ef1590f0-8bdf-4689-bc71-32d827e7bb2f.jpg',
  },
];

let currentTrackIndex = 0;

// Initialize player
function initializePlayer() {
  loadTrack(currentTrackIndex);
  createPlaylist();
}

// Load track
function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.file;
  audio.onerror = () => console.error('Failed to load audio file:', audio.src); // Error handling
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  albumArt.src = track.albumArt;
  currentTime.textContent = '0:00';
  setTimeout(() => {
    totalTime.textContent = formatTime(audio.duration);
  }, 100);
}

// Create playlist
function createPlaylist() {
  playlist.innerHTML = '';
  tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = `${track.title} - ${track.artist}`;
    li.addEventListener('click', () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
    });
    playlist.appendChild(li);
  });
}

// Play track
function playTrack() {
  audio.play();
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
}

// Pause track
function pauseTrack() {
  audio.pause();
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
}

// Previous track
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

// Next track
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

// Update progress
function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTime.textContent = formatTime(audio.currentTime);
}

// Format time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Update volume
function updateVolume() {
  audio.volume = volumeSlider.value / 100;
}

// Event Listeners
playPauseButton.addEventListener('click', () =>
  audio.paused ? playTrack() : pauseTrack()
);
prevButton.addEventListener('click', prevTrack);
nextButton.addEventListener('click', nextTrack);
volumeSlider.addEventListener('input', updateVolume);
audio.addEventListener('timeupdate', updateProgress);

// Initialize the player when the page loads
window.addEventListener('load', initializePlayer);

audio.onerror = function (event) {
  console.error('Failed to load audio file:', audio.src);
  alert('Failed to load audio file. Check console for details.');
};
console.log(tracks.map((track) => track.file));
