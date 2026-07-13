import sys
from pathlib import Path

# Add current directory to path so tests can import app module
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))
