"use client"
import Loading from '../../../../components/Loading';
import React, { useState } from 'react'

function page() {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div>
          {/* Other component code */}
          {isLoading && <Loading />}
        </div>
    );
}

export default page