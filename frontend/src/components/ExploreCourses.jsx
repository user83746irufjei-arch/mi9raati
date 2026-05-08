import { useState } from 'react';

const INITIAL_COURSES = [
  {
    id: 1,
    emoji: '🤖',
    thumb: 'thumb-blue',
    badge: 'badge-hot',
    badgeLabel: '🔥 Hot',
    title: 'Machine Learning A–Z',
    meta: '42 lessons · 18h · Intermediate',
    rating: '4.9',
    reviews: '12k',
    enrolled: false,
  },
  {
    id: 2,
    emoji: '💡',
    thumb: 'thumb-green',
    badge: 'badge-new',
    badgeLabel: 'New',
    title: 'Product Management 101',
    meta: '28 lessons · 12h · Beginner',
    rating: '4.7',
    reviews: '4.2k',
    enrolled: false,
  },
  {
    id: 3,
    emoji: '📊',
    thumb: 'thumb-amber',
    badge: 'badge-pop',
    badgeLabel: 'Popular',
    title: 'Excel & Data Analysis',
    meta: '36 lessons · 15h · Beginner',
    rating: '4.8',
    reviews: '9.1k',
    enrolled: true,
  },
  {
    id: 4,
    emoji: '🌐',
    thumb: 'thumb-black',
    badge: 'badge-new',
    badgeLabel: 'New',
    title: 'Web Dev with React',
    meta: '55 lessons · 24h · Advanced',
    rating: '4.9',
    reviews: '7.8k',
    enrolled: false,
  },
];

function CourseCard({ course, onToggle }) {
  return (
    <div className="course-card" onClick={onToggle}>
      <div className={`course-thumb ${course.thumb}`}>
        {course.emoji}
        <span className={`cc-badge ${course.badge}`}>{course.badgeLabel}</span>
      </div>

      <div className="course-body">
        <div className="course-title">{course.title}</div>
        <div className="course-meta">{course.meta}</div>
        <div className="course-footer">
          <div className="stars">
            ★ {course.rating}{' '}
            <span>({course.reviews})</span>
          </div>
          <button
            className={`enroll-btn${course.enrolled ? ' enrolled' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
          >
            {course.enrolled ? 'Enrolled' : 'Enroll'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExploreCourses() {
  const [courses, setCourses] = useState(INITIAL_COURSES);

  const toggleEnroll = (id) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enrolled: !c.enrolled } : c))
    );
  };

  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">Explore courses</div>
        <button className="section-link">Browse all</button>
      </div>

      <div className="course-grid">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} onToggle={() => toggleEnroll(c.id)} />
        ))}
      </div>
    </div>
  );
}
