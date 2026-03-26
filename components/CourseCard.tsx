import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  instructor: string;
  price: number;
  imageUrl: string;
  category?: string;
  duration?: string;
}

const CourseCard = ({
  title,
  description,
  instructor,
  price,
  imageUrl,
  category = 'Development',
  duration = '10 weeks'
}: CourseCardProps) => {
  return (
    <div className="card group">
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{duration}</span>
          <span className="mx-2">•</span>
          <span>By {instructor}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          <button className="btn-primary">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 