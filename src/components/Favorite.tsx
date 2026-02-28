

export default function Favorite(){

    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{flex: 1}}> </div>
            <div style={{ 
                flex: 4,
                backgroundColor: 'white', 
                padding: '20px',  
                borderBottom: '1px solid #DCDCDC',
                margin: '0 auto 20px auto' 
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
                
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>
                author: abc
                </div>


                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'black', marginBottom: '12px' }}>
                    title
                </div>


                <div style={{ fontSize: '1rem', color: 'black', lineHeight: '1.6', marginBottom: '20px' }}>
                    content
                </div>


                <div style={{ 
                    display: 'flex', 
                    gap: '24px',
                    color: '#666',
                    borderTop: '1px solid #f0f0f0', 
                    paddingTop: '12px' 
                }}>
                    <button 
                    style={{
                        backgroundColor: "transparent",
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        color: 'inherit',
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ☆ Favorite
                        </span>
                    </button>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        🖒 Likes
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        👁 Reads
                    </span>
                </div>

            </div>
            <div style={{flex: 1}}></div>
        </div>
    )
}