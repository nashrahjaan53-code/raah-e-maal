import sys
from pathlib import Path

# Add backend directory to path so tests can import app module
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))
