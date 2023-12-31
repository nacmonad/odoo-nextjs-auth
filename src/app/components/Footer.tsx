import React, {FC} from 'react';

const Footer: FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="font-normal text-center p-2 border-t-2 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white dark:border-gray-900">
            <p>&copy; {currentYear} Your Company. All rights reserved.</p>
        </div>
    );
};

export default Footer;
