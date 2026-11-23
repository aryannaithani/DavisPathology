import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  action,
  className,
}) => {
  return (
    <div className={cn('mb-8 bg-white border-2 border-[#171717] border-t-4 border-t-[#F1654C] p-5 sm:p-6 shadow-[3px_3px_0px_0px_#171717]', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-1.5 text-xs uppercase font-bold tracking-wider text-neutral-500 mb-2.5">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={index}>
                {item.href && !isLast ? (
                  <Link to={item.href} className="text-[#F1654C] hover:underline font-black">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-[#171717]' : ''}>
                    {item.label}
                  </span>
                )}
                {!isLast && <span className="text-neutral-400">/</span>}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-neutral-200 pt-3">
        <div className="border-l-4 border-primary pl-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#171717] uppercase tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
      </div>
    </div>
  );
};
